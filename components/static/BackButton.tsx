/*
WHAT:
buttton for projects that links to live version of current project
*/

type Props = {
  
};

export default function BackButton({}: Props) {
  return (
    <div className="fixed mt-4 top-0 left-4">
    <a
      href={"/"}
      className="flex h-8 justify-center items-center px-4 py-2 lg:py-1  rounded-[15px] lg:rounded-full bg-trans-white gap-2 group hover:text-white hover:bg-main-black"
    >
     <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 1L1 6.5M1 6.5L8 12M1 6.5H14" className=" stroke-main-black group-hover:stroke-white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    </a>
    </div>
  );
}
