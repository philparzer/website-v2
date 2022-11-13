/*
WHAT:
  TODO:
*/

import SideBySideWrapper from "../builder-utils/SideBySideWrapper";
import RectImage from "../builder-utils/RectImage";
import SideBySideCard from "../builder-utils/SideBySideCard";
import CardText from "../builder-utils/CardText";

interface Props {
  title: string;
  body: string;
  image: string;
  altText: string;
  isVideo: boolean;
  isRight: boolean;
  format: string;
}

export default function SideBySide({title, body, image, altText, isVideo, isRight, format}: Props) {
  return (
    <SideBySideWrapper>
      <SideBySideCard isRight={isRight}>
        <CardText 
          title={title}
          body={body}
          isRight={isRight}
        />
      </SideBySideCard>
      
      <RectImage path={image} altText={altText} isRight={isRight} isVideo={isVideo} format={format}/>
      
      
    </SideBySideWrapper>
  );
}
