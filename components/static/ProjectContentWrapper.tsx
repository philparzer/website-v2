/*
WHAT:
TODO:
*/

interface Props {
  children: any
}

export default function Layout({ children }:Props) {
  return (
      <div className="absolute w-full flex justify-center px-[5%] py-[79px]">
          <div className="flex max-w-[894px] w-full flex-col gap-8">
              {children}
          </div>
      </div>
  )
}