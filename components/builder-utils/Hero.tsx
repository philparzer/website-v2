/*
WHAT:
  bold defacto h1 for projects, to be placed inside bodycard
*/

interface Props {
  title: string,
  body: string
}

export default function Hero({title, body}: Props) {
  return (
    <div className="flex flex-col m-9 gap-6 lg:w-7/12">
      <h2 className="font-robotoFlex text-6xl h1-projects">{title}</h2>
      <div
        className="font-robotoFlex text-white"
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      ></div>
    </div>
  );
}
