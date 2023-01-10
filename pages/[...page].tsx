import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import Background from "../components/static/Background";
import Layout from "../components/static/ProjectContentWrapper"
import ProjectHead from "../components/builder-utils/ProjectHead";
import BackButton from "../components/static/BackButton";
import KBarButton from "../components/kbar/KBarButton";
import { redirect, contactActions, legalActions } from "../components/kbar/kbarActions"
import { useRegisterActions } from "kbar";
import Custom404 from "./Custom404"

export async function getStaticProps({ params, locale }: any) {
  /*
    Fetch the first page from Builder that matches the current URL.
    The `userAttributes` field is used for targeting content,
    learn more here: https://www.builder.io/c/docs/targeting-with-builder
  */

  /*FIXME: /spi Warning: data for page "/[...page]" (path "/spi") is 133 kB which exceeds the threshold of 128 kB, this amount of data can reduce performance.
    See more info here: https://nextjs.org/docs/messages/large-page-data*/
    
  const links:any = await builder.getAll('project', {
    });
  const page:any = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + (params?.page?.join("/") || ""),
      },
    })
    .toPromise();

  const correctLink:any = links.filter((item:any) => item.data.link.value.data.url === page?.data?.url)[0]

  return {
    props: {
      page: page || null,
      links: links || null,
      link: correctLink || null,
      locale: locale || null,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  /*
    Fetch all published pages for the current model.
    Using the `fields` option will limit the size of the response
    and only return the `data.url` field from the matching pages.
  */

  const pages = await builder.getAll("page", {
    fields: "data.url", // only request the `data.url` field
    options: { noTargeting: true },
    limit: 0,
  });

  return {
    paths: pages.map((page) => `${page.data?.url}`),
    fallback: "blocking", //TODO: look into
  };
}

export default function Page({ page, link, links, locale }: any) {
  const router = useRouter();
  /*
    This flag indicates if you are viewing the page in the Builder editor.
  */
  const isPreviewing = useIsPreviewing();
  const [kbarProjects, setKbarProjects] = useState<any>([])

  useEffect(() => {
    let projects = links.map((project:any) => {
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
    let actions = contactActions.concat(projects).concat(legalActions)

    setKbarProjects(actions)
  }, [])
  

  

  useRegisterActions(kbarProjects, [kbarProjects])


  if (router.isFallback) {
    return <h1>Loading...</h1>; //TODO: look into this
  }

  /*
    Add your error page here. This will happen if there are no matching
    content entries published in Builder.
  */
  if (!page && !isPreviewing) {
    return <Custom404 />; //TODO: customize 404
  }

  return (
    <>
      <Head>
        {/* Add any relevant SEO metadata or open graph tags here */}
        <title>{page?.data.title}</title>
        <meta
          property="og:image"
          content={`/api/og-project?locale=${locale}&lookup=${link.data.databaseLookup}&name=${link.data.link.value.name}&status=${link.data.status}`}
        />
        <meta name="description" content={page?.data.descripton} />
        <link rel="apple-touch-icon" sizes="180x180" href="../favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="../favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="../favicon/favicon-16x16.png" />
        <link rel="manifest" href="../favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ef476a" />
        <meta name="theme-color" content="#ffe7d8" />
      </Head>
      <Layout>
        <ProjectHead 
          locale={locale}
          title={link.data.link.value.name}
          logoPath={link.data.logo}
          externalLink={link.data.externalLink}
          logoAltText={link.data.logoAltText}
          databaseLookup={link.data.databaseLookup}
          status={link.data.status}
        />
        <BuilderComponent model="page" content={page} data={{ locale: locale }}/>
      </Layout>
      <Background />
    </>
  );
}
