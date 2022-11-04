/*
WHAT:

*/
  
export default function BodyCard ({children}:any) {
    return (
  <div className="flex flex-wrap card rounded-[30px]">
    {children}
  </div>
    )
};
