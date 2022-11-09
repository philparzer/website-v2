/*
WHAT:
  body text for projects
*/

export default function CardText(props: any) {
  return (
    <div className="flex flex-col m-9 gap-6 lg:w-7/12">
      <h2 className="font-robotoFlex text-3xl h2-projects">Playful and out of the ordinary</h2>
      <p className="font-robotoFlex text-white"> {/*TODO: look into rich text */}
      I wanted to create something entirely new and play to our strengths.

This was my first real Next.js project, which I’m pretty proud of. There are a few things I’d definitely do different now, but that’s alright.
      </p>
    </div>
  );
}
