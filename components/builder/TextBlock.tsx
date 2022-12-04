//WHAT: text block for e.g. about section

interface Props {
  body: any;
}

export default function TextBlock({ body }: Props) {
  return (
        <div 
        className="richtext"
        dangerouslySetInnerHTML={{
          __html: body,
        }}> 
        
      </div>
  );
}
