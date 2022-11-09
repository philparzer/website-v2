/*
WHAT:
  bold defacto h1 for projects, to be placed inside bodycard
*/

//TODO: type props

import BodyCard from "../builder-utils/BodyCard";
import BulletpointWrapper from "../builder-utils/BulletpointWrapper";
import Hero from "../builder-utils/Hero";

export default function HeroSection(props: any) {
  return (
    <BodyCard>
      <Hero 
        title={props.title}
        body={props.body}
    />
      <BulletpointWrapper 
        title={props.bulletpointTitle}
        categories={props.bulletpointCategories}
      />
    </BodyCard>
  );
}
