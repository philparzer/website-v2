/*
WHAT:
TODO:
*/

interface Props {
  children: any
}

export default function Layout({ children }:Props) {
  return (
      <div className="absolute">
          <div className="">
              {children}
          </div>
      </div>
  )
}