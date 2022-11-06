/*
WHAT:
  bold defacto h1 for projects, to be placed inside bodycard
*/

export default function Hero(props: any) {
  return (
    <div className="flex flex-col m-9 gap-6 lg:w-7/12">
      <h2 className="font-robotoFlex text-6xl h1-projects">Going Local</h2>
      <p className="font-robotoFlex text-white"> {/*TODO: look into rich text */}
        At the height of the NFT craze, me, my girlfriend, my brother and two
        colleagues from university created Zebras. Unlike everyone else, we
        focused on local businesses to push our brand. 
        I created the first
        Zebra, pioneered the art style, and was responsible for all things tech
        and product.
      </p>
    </div>
  );
}
