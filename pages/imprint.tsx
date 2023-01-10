import { useRouter } from "next/router";
import { builder } from "@builder.io/sdk";
import { BuilderComponent } from "@builder.io/react"
import Layout from "../components/static/IndexLayout";
import { redirect, legalActions, contactActions } from "../components/kbar/kbarActions"
import { useRegisterActions } from "kbar";
import KBarButton from "../components/kbar/KBarButton";
import IAM from "../components/static/IAM";
import { useState, useEffect} from "react"
import Head from "next/head";
import { localizedStaticContent } from "../localization/dict";

export default function Page(props: any) {

  let projects = props.links.map((project:any) => {
    return {
      id: project.data.databaseLookup,
      name: project.name,
      section: "Projects",
      perform: () => (
        redirect(window.location, project.data.link.value.data.url, "")
      ),
      thumbnail: project.data.logo
    }
  })

  const [isWindows, setIsWindows] = useState(false)

  useEffect(() => {
    if (navigator.userAgent.indexOf('Win') != -1) setIsWindows(true);
  }, [])

  let actions = contactActions.concat(projects)
  actions = actions.concat(legalActions)

  useRegisterActions(actions, [actions])

  return (
    <>
      <Head>
      <title>Impressum</title>
        <meta
          property="og:image"
          content={`/api/og-home?locale=${props.locale}`}
        />
        <meta 
          name="description"
          content={localizedStaticContent.metaHome[props.locale]}
        />
        <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png" />
          <link rel="manifest" href="favicon/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#ef476a" />
          <meta name="theme-color"  content="#EF476A"  />
      </Head>
      <Layout>
      <div className={`${isWindows && "windows-scrollbars"}`}>
      <div className="relative w-11/12 lg:w-7/12 sm:max-w-[895px] ">
        <IAM IAMStrings={props.IAMStrings} locale={props.locale}/>
      </div>
      <div className="mx-4 lg:mx-0 h-full sm:max-w-[895px] lg:h-[65%] lg:max-h-[567.54px] rounded-[30px] card">
        <div className="absolute w-full h-full rounded-[30px] -z-10 card-noise"></div>
        <div className="absolute top-5 right-7 w-full flex gap-4 justify-end">
          <KBarButton locale={props.locale}/>
          {/* <CursorCustomizer cookie={cookie} /> TODO: uncomment when liveblocks */}
        </div>
        <div className="h-full overflow-auto max-h-[70vh]">
          <BuilderComponent model="imprint" content={props.imprint} />
        </div>
        </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params, locale }:any) {
  const urlPath = '/' + (params?.page?.join('/') || '');
  const links = await builder.getAll("project", {
    // You can use options for queries, sorting, and targeting here
    // https://github.com/BuilderIO/builder/blob/main/packages/core/docs/interfaces/GetContentOptions.md
  });

  const IAMStrings = await builder.getAll('i-am', {
  });

  const imprint = await builder
    .get('imprint', { userAttributes: { urlPath } })
    .toPromise();

  return {
    props: {
      links: links || null,
      IAMStrings: IAMStrings || null,
      imprint: imprint || null,
      locale: locale || null
    },
    revalidate: 5,
  };
}
