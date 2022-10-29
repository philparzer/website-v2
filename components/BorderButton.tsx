/*
WHAT:

*/

interface Props {
    callback: () => void
    buttonSVG: any
}

export default function SVGButton({ callback, buttonSVG }:Props) {
    return (
        <button onClick={callback}>
            {buttonSVG}
        </button>
    )
}