/*
WHAT:
TODO:
*/

interface Props {
  children: any
}

export default function Layout({ children }:Props) {
  return (
      <div className="absolute w-full flex justify-center px-[5%] py-[60px]">
          <div className="flex  w-full flex-col items-center">
              {children}
          </div>
      </div>
  )
}