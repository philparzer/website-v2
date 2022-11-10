/*
WHAT:
  bold defacto h1 for projects, to be placed inside bodycard
*/

interface Props {
  title: string,
  body: string,
  bulletpointTitle: string,
  bulletpointCategories: []
}

import BodyCard from "../builder-utils/BodyCard";
import BulletpointWrapper from "../builder-utils/BulletpointWrapper";
import Hero from "../builder-utils/Hero";

export default function HeroSection({title, body, bulletpointTitle, bulletpointCategories}:Props) {
  return (
    <BodyCard>
      <Hero 
        title={title}
        body={body}
    />
      <BulletpointWrapper 
        title={bulletpointTitle}
        bulletPointEntries={bulletpointCategories}
      />
    </BodyCard>
  );
}
