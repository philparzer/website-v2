import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import React from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import dynamic from "next/dynamic";
import Background from "../components/static/Background";
import Layout from "../components/static/ProjectContentWrapper"
import ProjectHead from "../components/builder/ProjectHead";
import BodyCard from "../components/builder/BodyCard";
import Hero from "../components/builder/Hero";
import BulletpointWrapper from "../components/builder/BulletpointWrapper";
import SideBySideWrapper from "../components/builder/SideBySideWrapper";
import RectImage from "../components/builder/RectImage";
import SideBySideCard from "../components/builder/SideBySideCard";
import CardText from "../components/builder/CardText";

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

  return {
    props: {
      page: page || null,
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

export default function Page({ page }: any) {
  const router = useRouter();
  /*
    This flag indicates if you are viewing the page in the Builder editor.
  */
  const isPreviewing = useIsPreviewing();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  /*
    Add your error page here. This will happen if there are no matching
    content entries published in Builder.
  */
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        {/* Add any relevant SEO metadata or open graph tags here */}
        <title>{page?.data.title}</title>
        <meta name="description" content={page?.data.descripton} />
      </Head>
      <Layout>
        <ProjectHead />
        <BuilderComponent model="page" content={page} />
        {/*TODO: remove components below*/}
        <BodyCard>
          <Hero />
          <BulletpointWrapper />
        </BodyCard>
        <SideBySideWrapper>
          <SideBySideCard>
            <CardText />
          </SideBySideCard>
          <RectImage path="/images/testimg.png" altText="test"/>
        </SideBySideWrapper>
      </Layout>
      <Background />
    </>
  );
}
