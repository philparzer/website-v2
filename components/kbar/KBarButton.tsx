import { useKBar } from "kbar";
import { localizedKBar } from "../../localization/dict";

interface Props {
  locale: string;
}

const KBarButton = ({locale}: Props) => {
  const { query, options } = useKBar();

  return (
    <div className="">
      <button
        title={localizedKBar.searchButton[locale]}
        onClick={query.toggle}
        className="flex items-center gap-1 group focus-visible:none"
      >
        <svg
          className="h-4"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_218_210)">
            <path
              d="M14.1147 16L9.19 11.0753C8.26467 11.658 7.174 12 6 12C2.686 12 0 9.314 0 6C0 2.686 2.686 0 6 0C9.314 0 12 2.686 12 6C12 7.174 11.6573 8.26533 11.0753 9.19L16 14.1147L14.1147 16ZM6 10.6667C8.57267 10.6667 10.6667 8.57333 10.6667 6C10.6667 3.42667 8.57267 1.33333 6 1.33333C3.42733 1.33333 1.33333 3.42667 1.33333 6C1.33333 8.57333 3.42733 10.6667 6 10.6667Z"
              className="fill-main-black group-hover:fill-white"
            />
          </g>
          <defs>
            <clipPath id="clip0_218_210">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default KBarButton;
