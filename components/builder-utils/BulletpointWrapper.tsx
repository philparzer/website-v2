/*
WHAT:
  TODO: 
*/

//TODO: type props

import BulletpointsEntry from "./BulletpointsEntry";


export default function CardBulletpoints(props:any) {
  return (
    <div className="p-9 flex flex-col border border-transparent border-l-trans-white gap-3">
      <h2 className="text-white font-robotoFlex variable-semibold text-xl pb-2">Technologies</h2>
       {/*TODO: Bulletpoint Wrappers here */}
       {
        props.categories.map((category:any) => 
        <BulletpointsEntry 
          title={category.categoryTitle}
          bulletpoints={category.bulletpoints}
        />)
       }
    </div>
  );
}
