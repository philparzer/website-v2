/*
WHAT:
buttton for projects that can be used to like the current project
*/
import axios from "axios"
import {
  useMutation,
  useQueryClient
} from 'react-query'
import { useCookie } from "next-cookie";
import { useState, useEffect } from "react";
import { localizedStaticContent } from "../../localization/dict";



export default function FaveButton(props:any) {

  const cookie = useCookie(props.cookie);

  const project = props.databaseLookup;
  let projectsVoted:string[] = [];

  if (cookie.has("projectsVoted")) {
    projectsVoted = cookie.get("projectsVoted")
  }
  
  const [buttonDisabled, setButtonDisabled] = useState<boolean>()

  useEffect(() => {
    setButtonDisabled(projectsVoted.includes(project));
  }, [])

  const mutation = useMutation(() => { //TODO: two functions
    let data = {"projectName": project};
    projectsVoted.push(project);
    setButtonDisabled(true);
    cookie.set("projectsVoted", projectsVoted)
    return axios.post('/api/add-favorite', data)
  })
  
  return (
    <button
      className={`flex justify-center items-center px-4 py-2 lg:pl-4 lg:pr-4 lg:py-1 gap-2 project-ctas group  ${buttonDisabled === false && "hover:text-white  hover:bg-main-black rounded-[15px] lg:rounded-full bg-trans-white"}`}
      onClick={() => mutation.mutate()}
      disabled={buttonDisabled}
    >
<div className="items-center pt-0.5">

{buttonDisabled === false 
? <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" className={`stroke-main-black fill-main-black group-hover:stroke-white group-hover:fill-white`} viewBox="0 0 24 24"><path d="M11.574 3.712c.195-.323.662-.323.857 0l9.37 15.545c.2.333-.039.757-.429.757l-18.668-.006c-.385 0-.629-.422-.428-.758l9.298-15.538zm.429-2.483c-.76 0-1.521.37-1.966 1.111l-9.707 16.18c-.915 1.523.182 3.472 1.965 3.472h19.416c1.783 0 2.879-1.949 1.965-3.472l-9.707-16.18c-.446-.741-1.205-1.111-1.966-1.111z"/></svg>
: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" className={`stroke-main-black fill-main-black`} viewBox="0 0 24 24"><path d="M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z"/></svg>
}
</div>

<span className={`hidden lg:inline font-robotoFlex variable-semibold text-xl text-main-black ${!buttonDisabled && "group-hover:text-white"}`}>{buttonDisabled ? localizedStaticContent.upvoted[props.locale] : localizedStaticContent.upvote[props.locale]}</span>
    </button>
  );
}
