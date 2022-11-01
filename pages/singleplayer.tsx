import { useRouter } from "next/router";
import { builder } from "@builder.io/sdk";
import Layout from "../components/static/IndexLayout";

export default function Page(props: any) {
  const router = useRouter();
  console.log(router.query.viewport);
  return (
    <>
      <Layout>
      <div className="font-robotoFlex text-2xl h1-projects">NFTs going local</div>
      <div>
        {props.links.map((link: any, index: number) => (
          <a key={index} href={link.data.url}>
            {link.name}
          </a>
        ))}
      </div>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const links = await builder.getAll("project", {
    // You can use options for queries, sorting, and targeting here
    // https://github.com/BuilderIO/builder/blob/main/packages/core/docs/interfaces/GetContentOptions.md
  });

  return {
    props: {
      links: links || null,
    },
    revalidate: 5,
  };
}
