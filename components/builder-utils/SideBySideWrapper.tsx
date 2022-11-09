/*
WHAT:
TODO:
*/
  
export default function SideBySideWrapper({children}:any) {
  return (
<div className="flex flex-wrap lg:grid lg:grid-cols-2 items-center card-width-main mb-8">
  {children}
</div>
  )
};
