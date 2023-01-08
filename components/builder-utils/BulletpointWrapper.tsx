/*
WHAT:
  Bulletpoint wrapper for home
*/


interface Bulletpoint {
  text: string
}

interface BulletpointsEntry {
  categoryTitle: string, 
  bulletpoints: [Bulletpoint]
}

interface Props {
  title: string,
  bulletPointEntries: []
}

import BulletpointsEntry from "./BulletpointsEntry";


export default function CardBulletpoints({title, bulletPointEntries}:Props) {
  return (
    <div className="p-9 flex flex-col border border-transparent border-t-trans-white w-full lg:w-auto lg:border-t-0 lg:border-l-trans-white gap-3">
      <h2 className="text-white font-robotoFlex variable-semibold text-xl pb-2">{title}</h2>
       {
        bulletPointEntries.map((entry:BulletpointsEntry, i:number) => 
        <BulletpointsEntry 
          key={i}
          title={entry.categoryTitle}
          bulletpoints={entry.bulletpoints}
        />)
       }
    </div>
  );
}
