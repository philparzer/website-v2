import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import React from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import Background from "../components/static/Background";
import Layout from "../components/static/ProjectContentWrapper"
import ProjectHead from "../components/builder-utils/ProjectHead";
import BackButton from "../components/static/BackButton";
import KBarButton from "../components/kbar/KBarButton";

export async function getStaticProps({ params }: any) {
  /*
    Fetch the first page from Builder that matches the current URL.
    The `userAttributes` field is used for targeting content,
    learn more here: https://www.builder.io/c/docs/targeting-with-builder
  */
  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + (params?.page?.join("/") || ""),
      },
    })
    
    .toPromise();

  const links = await builder.getAll('project', {
  });

  const correctLink = links.filter((item:any) => item.data.link.value.data.url === page.data.url)[0]

  return {
    props: {
      page: page || null,
      link: correctLink || null
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
    fallback: true,
  };
}

export default function Page({ page, link }: any) {
  const router = useRouter();
  /*
    This flag indicates if you are viewing the page in the Builder editor.
  */
  const isPreviewing = useIsPreviewing();

  if (router.isFallback) {
    return <h1>Loading...</h1>; //TODO: look into this
  }

  /*
    Add your error page here. This will happen if there are no matching
    content entries published in Builder.
  */
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />; //TODO: customize 404
  }

  return (
    <>
      <Head>
        {/* Add any relevant SEO metadata or open graph tags here */}
        <title>{page?.data.title}</title>
        <meta name="description" content={page?.data.descripton} />
      </Head>
      <Layout>
        <ProjectHead 
          title={link.data.link.value.name}
          logoPath={link.data.logo}
          externalLink={link.data.externalLink}
          logoAltText={link.data.logoAltText}
          databaseLookup={link.data.databaseLookup}
          status={link.data.status}
        />
        <BuilderComponent model="page" content={page} />
        {/*TODO: remove components below*/}
        {/* <BodyCard>
          <Hero />
          <BulletpointWrapper />
        </BodyCard>
        <SideBySideWrapper>
          <SideBySideCard>
            <CardText />
          </SideBySideCard>
          <RectImage path="/images/testimg.png" altText="test"/>
        </SideBySideWrapper> */}
      </Layout>
      <Background />
    </>
  );
}
