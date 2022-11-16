/*
WHAT:
  TODO:
*/

import SideBySideWrapper from "../builder-utils/SideBySideWrapper";
import SideBySideCard from "../builder-utils/SideBySideCard";
import CardText from "../builder-utils/CardText";
import Model from "../builder-utils/Model"

interface Props {
  title: string;
  body: string;
  isRight: boolean;
  fbx: string;
  scale: number;
}

export default function DreiCard({title, body, isRight, fbx, scale }: Props) {
  return (
    <div className="flex flex-wrap lg:grid lg:grid-cols-2 items-center card-width-main mb-8">
      <div 
  className={`
    flex flex-wrap card rounded-[30px] card-width-main order-2 -mt-[50px] lg:-mt-0 relative z-10
    ${ isRight ? "lg:order-first" : "lg:order-last"}
  `}>
        <CardText 
          title={title}
          body={body}
          isRight={isRight}
        />
     </div>
      
      <Model
        path={fbx}
        scale={scale}
      />
      
      
    </div>
  );
}
