//WHAT: content block for e.g. imprint page

interface Props {
  title: string;
  body: any;
}

export default function InfoSection({ title, body }: Props) {
  return (
    <div className="flex flex-col text-lg lg:flex-row lg:h-full w-full px-4">
      <div className="flex flex-col w-full lg:w-[80%] px-5 lg:px-10 py-10 lg:py-20 text-white">
      <h1 className="h1-projects text-4xl lg:text-6xl mb-8">{title}</h1>
        <div 
        className="richtext"
        dangerouslySetInnerHTML={{
          __html: body,
        }}> 
        
      </div>
      </div>
    </div>
  );
}
