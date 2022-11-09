/*
WHAT:
  TODO:
*/

//TODO: type props

export default function BulletpointsEntry(props:any) {
  return (
    <div>
      <h3 className="text-white text-sm">{props.title}</h3>
      <ul className="font-robotoFlex text-main-black text-xl"> {/*TODO: map*/}
        {props.bulletpoints.map((bulletpoint:any) => <li>{bulletpoint.text}</li>)}
      </ul>
    </div>
  );
}
