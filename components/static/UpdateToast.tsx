import { localizedStaticContent } from "../../localization/dict";

interface Props {
  locale: string;
  content: any;
}

const UpdateToast = ({ locale, content }: Props) => {
  return (
    <div className="flex flex-col text-xs gap-2 font-robotoFlex">
      <p className="">{localizedStaticContent.currentlyToast[locale]}</p>
      <div className="text-black text-base">
        {content.map((element:any, i:number) => <p key={i}>- {locale === "en"
          ? element.data.content.Default
          : element.data.content[locale]}</p>)}
      </div>
    </div>
  );
};

export default UpdateToast;
