import { useRouter } from "next/router";
import { builder } from "@builder.io/sdk";
import { BuilderComponent } from "@builder.io/react"
import Layout from "../components/static/IndexLayout";
import { redirect, legalActions, contactActions } from "../components/kbar/kbarActions"
import { useRegisterActions } from "kbar";
import KBarButton from "../components/kbar/KBarButton";
import IAM from "../components/static/IAM"
import InfoSection from "../components/builder/InfoSection";

export default function Page(props: any) {
  const router = useRouter();
  console.log(router.query.viewport);


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

  let actions = contactActions.concat(projects)
  actions = actions.concat(legalActions)

  useRegisterActions(actions, [actions])

  return (
    <>
      <Layout>
      <>
      <div className="relative w-11/12 lg:w-7/12 sm:max-w-[895px]">
        <IAM IAMStrings={props.IAMStrings} />
      </div>
      <div className="relative w-11/12 sm:max-w-[895px] h-[70%] lg:h-[65%] lg:max-h-[567.54px] rounded-[30px] card">
        <div className="absolute w-full h-full rounded-[30px] -z-10 card-noise"></div>
        <div className="absolute top-5 right-7 w-full flex gap-4 justify-end">
          <KBarButton />
          {/* <CursorCustomizer cookie={cookie} /> TODO: uncomment when liveblocks */}
        </div>
        <div className="h-full overflow-scroll">
          <BuilderComponent model="imprint" content={props.imprint} />
        </div>
        </div>
        </>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }:any) {
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
    },
    revalidate: 5,
  };
}
