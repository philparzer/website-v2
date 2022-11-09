/*
WHAT:
  bold defacto h1 for projects, to be placed inside bodycard
*/

//TODO: type props

export default function Hero(props: any) {
  return (
    <div className="flex flex-col m-9 gap-6 lg:w-7/12">
      <h2 className="font-robotoFlex text-6xl h1-projects">{props.title}</h2>
      <div
        className="font-robotoFlex text-white"
        dangerouslySetInnerHTML={{
          __html: props.body,
        }}
      ></div>
    </div>
  );
}
