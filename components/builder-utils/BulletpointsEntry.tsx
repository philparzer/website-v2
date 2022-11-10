/*
WHAT:
  Bulletpoint entry for hero card
*/

interface Bulletpoint {
  text: string
}

interface Props {
  title: string,
  bulletpoints: [Bulletpoint]
}

export default function BulletpointsEntry({title, bulletpoints}:Props) {
  return (
    <div>
      <h3 className="text-white text-sm">{title}</h3>
      <ul className="font-robotoFlex text-main-black text-xl">
        {bulletpoints.map((bulletpoint:Bulletpoint) => <li>{bulletpoint.text}</li>)}
      </ul>
    </div>
  );
}
