/*
WHAT:

*/

interface Props {
    children: any
}

export default function Layout({ children }:Props) {
    return (
        <div className="fixed background w-full h-full">
            <div className="flex flex-col justify-center items-center h-full">
                {children}
            </div>
        </div>
    )
}