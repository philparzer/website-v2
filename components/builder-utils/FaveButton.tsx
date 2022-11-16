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
import { useState, useEffect } from "react"



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
      className={`flex justify-center items-center px-4 py-2 lg:pl-4 lg:pr-5 lg:py-1 gap-2 project-ctas group  ${buttonDisabled === false && "hover:text-white  hover:bg-main-black rounded-[15px] lg:rounded-full bg-trans-white"}`}
      onClick={() => mutation.mutate()}
      disabled={buttonDisabled}
    >
<div className="lg:pb-0.5">

<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_394_16)">
<path d="M7.5 0.5L9.5 5L14.5 6L11 9.5L12 14.5L7.5 12L3.5 14.5L4 9L0.5 6L5.5 5L7.5 0.5Z" className={`${buttonDisabled === true ? "fill-main-black" : "fill-transparent"}`}/>
<mask id="path-2-inside-1_394_16" fill="white">
<path d="M6.9915 0.333947C7.086 0.129474 7.284 0 7.5 0C7.71675 0 7.914 0.129474 8.0085 0.333947C8.739 1.91132 9.996 4.62868 9.996 4.62868C9.996 4.62868 12.8543 5.04237 14.5125 5.28316C14.8148 5.32658 15 5.59579 15 5.87289C15 6.02289 14.946 6.17526 14.8267 6.29605C13.6192 7.51026 11.5402 9.60474 11.5402 9.60474C11.5402 9.60474 12.048 12.5787 12.342 14.3037C12.4042 14.6684 12.1358 15 11.7855 15C11.694 15 11.6025 14.9771 11.5192 14.9297C10.0432 14.1024 7.5 12.6789 7.5 12.6789C7.5 12.6789 4.95675 14.1024 3.48075 14.9297C3.3975 14.9771 3.30525 15 3.21375 15C2.865 15 2.595 14.6676 2.658 14.3037C2.95275 12.5787 3.4605 9.60474 3.4605 9.60474C3.4605 9.60474 1.38075 7.51026 0.174 6.29605C0.0540001 6.17526 0 6.02289 0 5.87368C0 5.59579 0.18675 5.32579 0.48825 5.28316C2.1465 5.04237 5.004 4.62868 5.004 4.62868C5.004 4.62868 6.26175 1.91132 6.9915 0.333947ZM7.5 1.93895L5.72925 5.72211L1.79475 6.28974L4.68075 9.16579L3.96975 13.3145L7.5 11.3368L11.0303 13.3145L10.317 9.18079L13.2052 6.28974L9.21975 5.69289L7.5 1.93895Z"/>
</mask>
<path d="M6.9915 0.333947C7.086 0.129474 7.284 0 7.5 0C7.71675 0 7.914 0.129474 8.0085 0.333947C8.739 1.91132 9.996 4.62868 9.996 4.62868C9.996 4.62868 12.8543 5.04237 14.5125 5.28316C14.8148 5.32658 15 5.59579 15 5.87289C15 6.02289 14.946 6.17526 14.8267 6.29605C13.6192 7.51026 11.5402 9.60474 11.5402 9.60474C11.5402 9.60474 12.048 12.5787 12.342 14.3037C12.4042 14.6684 12.1358 15 11.7855 15C11.694 15 11.6025 14.9771 11.5192 14.9297C10.0432 14.1024 7.5 12.6789 7.5 12.6789C7.5 12.6789 4.95675 14.1024 3.48075 14.9297C3.3975 14.9771 3.30525 15 3.21375 15C2.865 15 2.595 14.6676 2.658 14.3037C2.95275 12.5787 3.4605 9.60474 3.4605 9.60474C3.4605 9.60474 1.38075 7.51026 0.174 6.29605C0.0540001 6.17526 0 6.02289 0 5.87368C0 5.59579 0.18675 5.32579 0.48825 5.28316C2.1465 5.04237 5.004 4.62868 5.004 4.62868C5.004 4.62868 6.26175 1.91132 6.9915 0.333947ZM7.5 1.93895L5.72925 5.72211L1.79475 6.28974L4.68075 9.16579L3.96975 13.3145L7.5 11.3368L11.0303 13.3145L10.317 9.18079L13.2052 6.28974L9.21975 5.69289L7.5 1.93895Z" className={`fill-main-black ${ !buttonDisabled &&  "group-hover:fill-white"}`}/>
<path d="M6.9915 0.333947L36.9416 14.19L36.947 14.1783L6.9915 0.333947ZM8.0085 0.333947L-21.947 14.1783L-21.9416 14.19L-21.9362 14.2017L8.0085 0.333947ZM9.996 4.62868L-19.9548 18.4833L-12.4417 34.725L5.26905 37.2884L9.996 4.62868ZM14.5125 5.28316L9.7704 37.9407L9.79516 37.9443L9.81992 37.9478L14.5125 5.28316ZM14.8267 6.29605L38.2258 29.5658L38.2682 29.5232L38.3104 29.4804L14.8267 6.29605ZM11.5402 9.60474L-11.8806 -13.6431L-23.848 -1.58667L-20.989 15.1586L11.5402 9.60474ZM12.342 14.3037L-20.1889 19.8481L-20.1876 19.8555L12.342 14.3037ZM11.5192 14.9297L27.8391 -13.7524L27.7473 -13.8046L27.6552 -13.8562L11.5192 14.9297ZM7.5 12.6789L23.617 -16.1176L7.5 -25.1381L-8.61702 -16.1176L7.5 12.6789ZM3.48075 14.9297L-12.6552 -13.8562L-12.7473 -13.8046L-12.8391 -13.7524L3.48075 14.9297ZM2.658 14.3037L35.1744 19.9323L35.1805 19.8971L35.1866 19.8618L2.658 14.3037ZM3.4605 9.60474L35.9898 15.1585L38.8494 -1.59038L26.8772 -13.6473L3.4605 9.60474ZM0.174 6.29605L-23.2369 29.5539L-23.2323 29.5586L0.174 6.29605ZM0.48825 5.28316L5.10843 37.9581L5.16941 37.9495L5.23035 37.9407L0.48825 5.28316ZM5.004 4.62868L9.73217 37.2882L27.4372 34.725L34.9516 18.4901L5.004 4.62868ZM7.5 1.93895L37.5016 -11.8053L7.8215 -76.5923L-22.3881 -12.0505L7.5 1.93895ZM5.72925 5.72211L10.4414 38.3839L28.0677 35.841L35.6173 19.7115L5.72925 5.72211ZM1.79475 6.28974L-2.91739 -26.3721L-68.269 -16.9438L-21.4995 29.6645L1.79475 6.28974ZM4.68075 9.16579L37.2066 14.74L40.0974 -2.12829L27.975 -14.209L4.68075 9.16579ZM3.96975 13.3145L-28.556 7.74022L-40.2381 75.9048L20.098 42.1048L3.96975 13.3145ZM7.5 11.3368L23.6282 -17.4535L7.5 -26.4884L-8.6282 -17.4535L7.5 11.3368ZM11.0303 13.3145L-5.09795 42.1048L55.3261 75.9541L43.5497 7.70337L11.0303 13.3145ZM10.317 9.18079L-13.0288 -14.1424L-25.1086 -2.05091L-22.2025 14.7919L10.317 9.18079ZM13.2052 6.28974L36.5511 29.6129L82.7786 -16.6594L18.0926 -26.3463L13.2052 6.28974ZM9.21975 5.69289L-20.7818 19.4372L-13.3395 35.6825L4.33239 38.329L9.21975 5.69289ZM36.947 14.1783C31.9006 25.0974 20.75 33 7.5 33V-33C-6.18196 -33 -17.7286 -24.8385 -22.964 -13.5104L36.947 14.1783ZM7.5 33C-5.77419 33 -16.9115 25.0739 -21.947 14.1783L37.964 -13.5104C32.7395 -24.8149 21.2077 -33 7.5 -33V33ZM-21.9362 14.2017C-21.5735 14.9849 -21.0786 16.0542 -20.6732 16.9304C-20.4708 17.3679 -20.2911 17.7563 -20.1621 18.0352C-20.0975 18.1747 -20.0457 18.2868 -20.01 18.364C-19.9921 18.4026 -19.9783 18.4325 -19.969 18.4527C-19.9643 18.4628 -19.9607 18.4704 -19.9584 18.4756C-19.9572 18.4782 -19.9563 18.4801 -19.9557 18.4814C-19.9554 18.482 -19.9551 18.4825 -19.955 18.4828C-19.9549 18.483 -19.9549 18.4831 -19.9548 18.4832C-19.9548 18.4832 -19.9548 18.4833 -19.9548 18.4833C-19.9548 18.4833 -19.9548 18.4833 9.996 4.62868C39.9468 -9.22595 39.9468 -9.22596 39.9468 -9.22599C39.9468 -9.22601 39.9467 -9.22604 39.9467 -9.22609C39.9467 -9.22617 39.9466 -9.2263 39.9465 -9.22647C39.9464 -9.22681 39.9461 -9.22732 39.9458 -9.22798C39.9452 -9.22931 39.9443 -9.2313 39.9431 -9.23391C39.9407 -9.23914 39.9371 -9.24691 39.9324 -9.2571C39.9229 -9.27747 39.909 -9.30753 39.8911 -9.34631C39.8552 -9.42389 39.8032 -9.53641 39.7384 -9.67634C39.609 -9.95619 39.4287 -10.3458 39.2256 -10.7848C38.8199 -11.6616 38.321 -12.7397 37.9532 -13.5338L-21.9362 14.2017ZM9.996 4.62868C5.26905 37.2884 5.26906 37.2884 5.26908 37.2884C5.2691 37.2884 5.26912 37.2884 5.26917 37.2884C5.26925 37.2884 5.26937 37.2884 5.26954 37.2885C5.26987 37.2885 5.27038 37.2886 5.27106 37.2887C5.27242 37.2889 5.27446 37.2892 5.27716 37.2896C5.28257 37.2903 5.29065 37.2915 5.30127 37.293C5.32251 37.2961 5.35392 37.3007 5.3945 37.3065C5.47568 37.3183 5.59356 37.3354 5.74023 37.3566C6.03359 37.3991 6.44198 37.4582 6.90205 37.5248C7.82352 37.6583 8.9476 37.8212 9.7704 37.9407L19.2546 -27.3743C18.4192 -27.4957 17.285 -27.66 16.3628 -27.7936C15.901 -27.8605 15.4912 -27.9198 15.1968 -27.9624C15.0496 -27.9837 14.9312 -28.0009 14.8496 -28.0127C14.8088 -28.0186 14.7772 -28.0232 14.7557 -28.0263C14.745 -28.0278 14.7368 -28.029 14.7313 -28.0298C14.7286 -28.0302 14.7265 -28.0305 14.7251 -28.0307C14.7244 -28.0308 14.7239 -28.0309 14.7235 -28.0309C14.7233 -28.031 14.7232 -28.031 14.7231 -28.031C14.7231 -28.031 14.723 -28.031 14.723 -28.031C14.723 -28.031 14.7229 -28.031 9.996 4.62868ZM9.81992 37.9478C-8.90079 35.2584 -18 19.0373 -18 5.87289H48C48 -7.84573 38.5303 -24.6052 19.2051 -27.3815L9.81992 37.9478ZM-18 5.87289C-18 -2.00686 -15.0764 -10.386 -8.65694 -16.8883L38.3104 29.4804C44.9684 22.7365 48 14.0527 48 5.87289H-18ZM-8.57234 -16.9737C-9.18519 -16.3575 -10.0141 -15.523 -10.6853 -14.8471C-11.0219 -14.5081 -11.3205 -14.2074 -11.535 -13.9913C-11.6423 -13.8832 -11.7285 -13.7963 -11.7881 -13.7364C-11.8178 -13.7064 -11.8409 -13.6831 -11.8566 -13.6674C-11.8644 -13.6595 -11.8704 -13.6534 -11.8744 -13.6494C-11.8764 -13.6473 -11.878 -13.6458 -11.879 -13.6447C-11.8795 -13.6442 -11.8799 -13.6438 -11.8802 -13.6435C-11.8803 -13.6434 -11.8804 -13.6433 -11.8805 -13.6432C-11.8805 -13.6432 -11.8806 -13.6432 -11.8806 -13.6432C-11.8806 -13.6431 -11.8806 -13.6431 11.5402 9.60474C34.9611 32.8526 34.9611 32.8526 34.9611 32.8526C34.9611 32.8526 34.9612 32.8525 34.9612 32.8525C34.9612 32.8525 34.9613 32.8524 34.9615 32.8523C34.9617 32.852 34.962 32.8517 34.9625 32.8512C34.9635 32.8502 34.965 32.8487 34.9669 32.8467C34.9708 32.8428 34.9767 32.8369 34.9844 32.8292C34.9997 32.8137 35.0225 32.7908 35.0519 32.7611C35.1108 32.7018 35.1964 32.6156 35.3029 32.5083C35.5159 32.2937 35.8125 31.995 36.1467 31.6585C36.8168 30.9837 37.6312 30.1638 38.2258 29.5658L-8.57234 -16.9737ZM11.5402 9.60474C-20.989 15.1586 -20.989 15.1586 -20.989 15.1586C-20.989 15.1586 -20.989 15.1586 -20.989 15.1587C-20.989 15.1588 -20.989 15.1589 -20.989 15.1591C-20.9889 15.1594 -20.9888 15.16 -20.9887 15.1607C-20.9884 15.1621 -20.9881 15.1642 -20.9876 15.167C-20.9866 15.1727 -20.9852 15.1811 -20.9833 15.1922C-20.9795 15.2143 -20.9739 15.2471 -20.9667 15.2893C-20.9523 15.3739 -20.9313 15.4966 -20.9053 15.6494C-20.8531 15.9548 -20.7805 16.38 -20.6988 16.859C-20.5351 17.8179 -20.3352 18.9895 -20.1889 19.8481L44.8729 8.75929C44.7252 7.89286 44.5243 6.71498 44.3605 5.75564C44.2786 5.27556 44.2059 4.84946 44.1536 4.54338C44.1275 4.39034 44.1065 4.26728 44.092 4.18245C44.0848 4.14004 44.0792 4.10719 44.0754 4.08492C44.0734 4.07379 44.072 4.0653 44.071 4.05959C44.0705 4.05674 44.0702 4.05458 44.0699 4.05313C44.0698 4.0524 44.0697 4.05185 44.0696 4.05149C44.0696 4.0513 44.0696 4.05116 44.0696 4.05107C44.0696 4.05102 44.0696 4.05098 44.0696 4.05096C44.0695 4.05094 44.0695 4.05092 11.5402 9.60474ZM-20.1876 19.8555C-23.2802 1.73554 -9.96564 -18 11.7855 -18V48C34.2371 48 48.0887 27.6013 44.8716 8.75182L-20.1876 19.8555ZM11.7855 -18C17.2371 -18 22.7953 -16.6222 27.8391 -13.7524L-4.80058 43.6118C0.409736 46.5765 6.15094 48 11.7855 48V-18ZM27.6552 -13.8562C26.9093 -14.2743 25.8982 -14.8406 25.0774 -15.3001C24.6662 -15.5303 24.3013 -15.7346 24.0391 -15.8813C23.9081 -15.9547 23.8026 -16.0137 23.7299 -16.0544C23.6936 -16.0748 23.6654 -16.0905 23.6463 -16.1012C23.6368 -16.1066 23.6295 -16.1106 23.6245 -16.1134C23.6221 -16.1148 23.6202 -16.1158 23.619 -16.1165C23.6183 -16.1169 23.6179 -16.1171 23.6175 -16.1173C23.6174 -16.1174 23.6173 -16.1175 23.6172 -16.1175C23.6171 -16.1175 23.6171 -16.1176 23.6171 -16.1176C23.617 -16.1176 23.617 -16.1176 7.5 12.6789C-8.61703 41.4755 -8.61703 41.4755 -8.61701 41.4755C-8.61699 41.4755 -8.61697 41.4755 -8.61694 41.4756C-8.61687 41.4756 -8.61676 41.4757 -8.61661 41.4757C-8.61631 41.4759 -8.61587 41.4761 -8.61527 41.4765C-8.61407 41.4772 -8.61226 41.4782 -8.60986 41.4795C-8.60507 41.4822 -8.5979 41.4862 -8.58847 41.4915C-8.5696 41.502 -8.54169 41.5177 -8.50562 41.5379C-8.43347 41.5782 -8.32866 41.6369 -8.19825 41.7099C-7.9374 41.8559 -7.57425 42.0592 -7.16515 42.2882C-6.34532 42.7473 -5.34679 43.3064 -4.61666 43.7157L27.6552 -13.8562ZM7.5 12.6789C-8.61702 -16.1176 -8.61704 -16.1176 -8.61706 -16.1176C-8.61709 -16.1176 -8.61712 -16.1176 -8.61716 -16.1175C-8.61725 -16.1175 -8.61737 -16.1174 -8.61753 -16.1173C-8.61785 -16.1171 -8.61833 -16.1169 -8.61896 -16.1165C-8.62022 -16.1158 -8.62208 -16.1148 -8.62454 -16.1134C-8.62946 -16.1106 -8.63675 -16.1066 -8.64631 -16.1012C-8.66542 -16.0905 -8.69359 -16.0748 -8.72994 -16.0544C-8.80264 -16.0137 -8.90806 -15.9547 -9.03914 -15.8813C-9.30127 -15.7346 -9.66619 -15.5303 -10.0774 -15.3001C-10.8982 -14.8406 -11.9093 -14.2743 -12.6552 -13.8562L19.6167 43.7157C20.3468 43.3064 21.3453 42.7473 22.1651 42.2883C22.5742 42.0592 22.9374 41.8559 23.1982 41.7099C23.3287 41.6369 23.4335 41.5782 23.5056 41.5379C23.5417 41.5177 23.5696 41.502 23.5885 41.4915C23.5979 41.4862 23.6051 41.4822 23.6099 41.4795C23.6123 41.4782 23.6141 41.4772 23.6153 41.4765C23.6159 41.4762 23.6163 41.4759 23.6166 41.4757C23.6168 41.4757 23.6169 41.4756 23.6169 41.4756C23.617 41.4755 23.617 41.4755 23.617 41.4755C23.617 41.4755 23.617 41.4755 7.5 12.6789ZM-12.8391 -13.7524C-7.75573 -16.6447 -2.19079 -18 3.21375 -18V48C8.80128 48 14.5507 46.599 19.8006 43.6118L-12.8391 -13.7524ZM3.21375 -18C24.9166 -18 38.3297 1.70432 35.1744 19.9323L-29.8584 8.67503C-33.1397 27.6309 -19.1866 48 3.21375 48V-18ZM35.1866 19.8618C35.3342 18.9975 35.5351 17.8213 35.6989 16.8621C35.7808 16.3823 35.8536 15.9565 35.9058 15.6506C35.9319 15.4976 35.9529 15.3746 35.9674 15.2899C35.9746 15.2475 35.9802 15.2147 35.984 15.1924C35.9859 15.1813 35.9874 15.1729 35.9883 15.1672C35.9888 15.1643 35.9892 15.1622 35.9894 15.1607C35.9895 15.16 35.9896 15.1595 35.9897 15.1591C35.9897 15.1589 35.9898 15.1588 35.9898 15.1587C35.9898 15.1586 35.9898 15.1586 35.9898 15.1586C35.9898 15.1586 35.9898 15.1585 3.4605 9.60474C-29.0688 4.05093 -29.0688 4.05094 -29.0688 4.05096C-29.0688 4.05098 -29.0688 4.05101 -29.0688 4.05106C-29.0688 4.05115 -29.0689 4.05128 -29.0689 4.05146C-29.0689 4.05182 -29.069 4.05235 -29.0692 4.05307C-29.0694 4.0545 -29.0698 4.05664 -29.0703 4.05947C-29.0712 4.06514 -29.0727 4.07358 -29.0746 4.08466C-29.0783 4.10684 -29.0839 4.1396 -29.0912 4.18191C-29.1056 4.26654 -29.1266 4.38937 -29.1527 4.54218C-29.2049 4.84779 -29.2775 5.27324 -29.3594 5.75255C-29.5231 6.71156 -29.7235 7.88485 -29.8706 8.74554L35.1866 19.8618ZM3.4605 9.60474C26.8772 -13.6473 26.8772 -13.6473 26.8772 -13.6474C26.8771 -13.6474 26.8771 -13.6474 26.8771 -13.6474C26.877 -13.6475 26.8769 -13.6476 26.8768 -13.6477C26.8765 -13.648 26.8761 -13.6484 26.8756 -13.6489C26.8746 -13.6499 26.8731 -13.6515 26.8711 -13.6535C26.8671 -13.6575 26.8611 -13.6635 26.8533 -13.6713C26.8377 -13.6871 26.8147 -13.7102 26.7851 -13.7401C26.7257 -13.7999 26.6396 -13.8866 26.5325 -13.9945C26.3183 -14.2102 26.0201 -14.5104 25.6841 -14.8487C25.0131 -15.5243 24.188 -16.355 23.5803 -16.9665L-23.2323 29.5586C-22.6333 30.1613 -21.8151 30.985 -21.1446 31.6601C-20.8098 31.9973 -20.5126 32.2965 -20.2991 32.5115C-20.1924 32.619 -20.1066 32.7054 -20.0475 32.7649C-20.018 32.7946 -19.9951 32.8176 -19.9796 32.8332C-19.9719 32.841 -19.966 32.8469 -19.9621 32.8509C-19.9601 32.8528 -19.9586 32.8543 -19.9577 32.8553C-19.9572 32.8558 -19.9568 32.8562 -19.9565 32.8564C-19.9564 32.8566 -19.9563 32.8567 -19.9563 32.8567C-19.9562 32.8568 -19.9562 32.8568 -19.9562 32.8568C-19.9562 32.8568 -19.9562 32.8568 3.4605 9.60474ZM23.5849 -16.9618C30.049 -10.4552 33 -2.04372 33 5.87368H-33C-33 14.0895 -29.941 22.8058 -23.2369 29.5539L23.5849 -16.9618ZM33 5.87368C33 19.0392 23.8867 35.3029 5.10843 37.9581L-4.13193 -27.3918C-23.5132 -24.6513 -33 -7.84765 -33 5.87368H33ZM5.23035 37.9407C6.05366 37.8211 7.17796 37.6582 8.09927 37.5247C8.55932 37.458 8.96767 37.3989 9.261 37.3564C9.40765 37.3352 9.52553 37.3181 9.6067 37.3064C9.64728 37.3005 9.67869 37.2959 9.69993 37.2929C9.71055 37.2913 9.71863 37.2902 9.72405 37.2894C9.72675 37.289 9.72879 37.2887 9.73015 37.2885C9.73083 37.2884 9.73134 37.2883 9.73168 37.2883C9.73184 37.2883 9.73197 37.2882 9.73205 37.2882C9.73209 37.2882 9.73212 37.2882 9.73214 37.2882C9.73216 37.2882 9.73217 37.2882 5.004 4.62868C0.275834 -28.0308 0.27582 -28.0308 0.275794 -28.0308C0.275771 -28.0308 0.275734 -28.0308 0.275688 -28.0308C0.275596 -28.0308 0.27546 -28.0308 0.275281 -28.0308C0.274924 -28.0307 0.274394 -28.0306 0.273693 -28.0305C0.272292 -28.0303 0.270208 -28.03 0.267457 -28.0296C0.261956 -28.0288 0.253787 -28.0276 0.243074 -28.0261C0.221648 -28.023 0.190046 -28.0184 0.149258 -28.0125C0.0676832 -28.0007 -0.0506413 -27.9836 -0.197789 -27.9623C-0.492062 -27.9196 -0.901723 -27.8603 -1.36333 -27.7934C-2.28534 -27.6599 -3.41891 -27.4956 -4.25385 -27.3743L5.23035 37.9407ZM5.004 4.62868C34.9516 18.4901 34.9516 18.4901 34.9516 18.4901C34.9517 18.4901 34.9517 18.49 34.9517 18.49C34.9517 18.4899 34.9518 18.4898 34.9519 18.4896C34.952 18.4893 34.9522 18.4888 34.9526 18.4881C34.9532 18.4868 34.9541 18.4848 34.9553 18.4822C34.9577 18.477 34.9613 18.4693 34.966 18.4591C34.9754 18.4388 34.9893 18.4088 35.0072 18.3701C35.043 18.2926 35.0951 18.1802 35.1598 18.0404C35.2892 17.7608 35.4693 17.3716 35.6723 16.9331C36.078 16.0564 36.5757 14.9809 36.9416 14.19L-22.9586 -13.5221C-23.3225 -12.7357 -23.8185 -11.6638 -24.2241 -10.7874C-24.4268 -10.3494 -24.6067 -9.96073 -24.7359 -9.68151C-24.8005 -9.54191 -24.8525 -9.42969 -24.8883 -9.35238C-24.9062 -9.31373 -24.92 -9.28381 -24.9294 -9.26356C-24.9341 -9.25343 -24.9376 -9.24572 -24.94 -9.24055C-24.9412 -9.23796 -24.9421 -9.23601 -24.9427 -9.23471C-24.943 -9.23405 -24.9433 -9.23356 -24.9434 -9.23324C-24.9435 -9.23308 -24.9435 -9.23295 -24.9436 -9.23287C-24.9436 -9.23283 -24.9436 -9.2328 -24.9436 -9.23278C-24.9436 -9.23276 -24.9436 -9.23275 5.004 4.62868ZM-22.3881 -12.0505L-24.1588 -8.26734L35.6173 19.7115L37.3881 15.9284L-22.3881 -12.0505ZM1.01711 -26.9397L-2.91739 -26.3721L6.50689 38.9516L10.4414 38.3839L1.01711 -26.9397ZM-21.4995 29.6645L-18.6135 32.5406L27.975 -14.209L25.089 -17.085L-21.4995 29.6645ZM-27.8451 3.59153L-28.556 7.74022L36.4955 18.8887L37.2066 14.74L-27.8451 3.59153ZM20.098 42.1048L23.6282 40.1271L-8.6282 -17.4535L-12.1585 -15.4758L20.098 42.1048ZM-8.6282 40.1271L-5.09795 42.1048L27.1585 -15.4758L23.6282 -17.4535L-8.6282 40.1271ZM43.5497 7.70337L42.8365 3.56968L-22.2025 14.7919L-21.4892 18.9256L43.5497 7.70337ZM33.6628 32.504L36.5511 29.6129L-10.1406 -17.0335L-13.0288 -14.1424L33.6628 32.504ZM18.0926 -26.3463L14.1071 -26.9432L4.33239 38.329L8.31789 38.9258L18.0926 -26.3463ZM39.2213 -8.05137L37.5016 -11.8053L-22.5016 15.6832L-20.7818 19.4372L39.2213 -8.05137Z" className={`fill-main-black ${ !buttonDisabled &&  "group-hover:fill-white"}`} mask="url(#path-2-inside-1_394_16)"/>
</g>
<defs>
<clipPath id="clip0_394_16">
<rect width="15" height="15" fill="white"/>
</clipPath>
</defs>
</svg>

</div>

<span className={`hidden lg:inline font-robotoFlex variable-semibold text-xl text-main-black ${!buttonDisabled && "group-hover:text-white"}`}>{buttonDisabled ? "liked" : "like"}</span>
    </button>
  );
}