/*
WHAT:
TODO:
*/
  
export default function SideBySideCard(props:any) {
  return (
<div 
  className={`
    flex flex-wrap card rounded-[30px] card-width-main order-2 -mt-[50px] lg:-mt-0
    ${ props.isRight ? "lg:order-first" : "lg:order-last"}
  `}>
  {props.children}
</div>
  )
};
