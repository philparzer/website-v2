/*
WHAT:
  body text for projects
*/

interface Props {
  title: string;
  body: string;
  isRight: boolean;
}

export default function CardText({title, body, isRight}: Props) {
  return (
    <div className={`flex flex-col m-9 gap-6 ${isRight === false && "lg:items-end lg:text-end"}`}>
      <h2 className="font-robotoFlex text-3xl h2-projects lg:w-7/12">{title}</h2>
      <div 
        className="font-robotoFlex text-white lg:w-10/12 richtext"
        dangerouslySetInnerHTML={{
          __html: body,
        }}> 
      </div>
    </div>
  );
}
