//WHAT: text block for e.g. about section

interface Props {
  body: any;
}

import {useRouter} from "next/router";

export default function TextBlock({ body }: Props) {
  
  const router = useRouter();
  const locale:any = router.locale;

  return (

    <>
        <div 
        className="richtext"
        dangerouslySetInnerHTML={{
          __html: locale === "en" ? body.Default : body[locale],
        }}> 
        
      </div>
      </>
  );
}
