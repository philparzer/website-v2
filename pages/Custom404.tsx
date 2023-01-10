
import Layout from "../components/static/IndexLayout";
import Head from "next/head";
import Link from "next/link"

const Page = (props: any) => {

  return (
    <>
      <Head>
        <title>404 Error</title>
        <meta
          property="og:image"
          content={`/api/og-home?locale=${props.locale}`}
        />
        <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png" />
          <link rel="manifest" href="favicon/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#ef476a" />
          <meta name="theme-color"  content="#EF476A"  />
      </Head>
      <Layout>
        <div className="flex flex-col items-center justify-center">
          <h1 className="h1-projects text-9xl">404</h1>
          <p className="h1-projects">page not found</p>
        </div>
          <Link href="/" title="home" className="mt-4"><svg xmlns="http://www.w3.org/2000/svg" className="fill-main-black" height="48" width="48"><path d="M11.45 38.55h6.2v-12.9h12.7v12.9h6.2V19.7L24 10.3l-12.55 9.4Zm0 4.7q-1.95 0-3.325-1.375Q6.75 40.5 6.75 38.55V19.7q0-1.1.5-2.1t1.4-1.65l12.5-9.4q.65-.45 1.4-.7.75-.25 1.45-.25.75 0 1.475.25.725.25 1.375.7l12.5 9.4q.9.7 1.425 1.675.525.975.525 2.075v18.85q0 1.95-1.4 3.325-1.4 1.375-3.35 1.375H26.2V29.8h-4.4v13.45ZM24 24.4Z"/></svg></Link>
      </Layout>
    </>
  );
}

export default Page;