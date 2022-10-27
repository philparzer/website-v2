/*
WHAT:

*/
import { useRouter } from "next/router";

export default function Page(props: any) {
const router = useRouter();
  console.log(router.query.viewport)
    return (
        <>
            <div>test mobile</div>
        </>
    )
}