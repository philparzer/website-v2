/*
WHAT:
TODO:
*/
  
export default function SideBySideCard({children}:any) {
  return (
<div className="flex flex-wrap card rounded-[30px] card-width-main order-2 lg:order-first -mt-[50px] lg:-mt-0">
  {children}
</div>
  )
};
