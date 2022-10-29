/*
WHAT:

*/
import rgbHex from 'rgb-hex';
import CursorCustomizer from "./CursorCustomizer";
import Image from 'next/image'
import ProjectLink from './ProjectLink';

interface Props {
  projects: any;
  cookie: any;
}

export default function HomeBox({ projects, cookie }: Props) {
  return (
    <>
      <div className="relative lg:w-7/12 max-w-[895px] lg:h-[65%] rounded-[30px] card">
        <div className="absolute right-10 top-5">
            <CursorCustomizer cookie={cookie} />
        </div>
        <div className="flex h-full">
            <div className="w-[20%] border-r-2 border-trans-white pt-20">
            {/*TODO: Filter Options*/}
            </div>
            
            <div className="flex flex-wrap px-10 pt-20">
            {projects.map((link: any, index: number) => (
                <ProjectLink
                    index={index}
                    url={link.data.url}
                    color={link.data.color}
                    name={link.name}
                    altText={link.data.logoAltText}
                    logoPath={link.data.logo}
                />
            ))}
            </div>
        </div>
        
      </div>
    </>
  );
}
