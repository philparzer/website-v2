// /compoponents/Favicon.tsx
const Favicon = (): JSX.Element => {
  return ( //FIXME: why not working on localised pages
      <>
          <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png" />
          <link rel="manifest" href="favicon/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#ef476a" />
          <meta name="theme-color" content="#ffe7d8" />
      </>
  );
}

export default Favicon;