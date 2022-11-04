/*
WHAT:

*/
  
export default function BodyCard ({children}:any) {
    return (
  <div className="flex flex-wrap card rounded-[30px] mb-8 card-width-main">
    {children}
  </div>
    )
};
