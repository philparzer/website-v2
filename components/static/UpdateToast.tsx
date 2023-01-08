import { localizedStaticContent } from "../../localization/dict";

interface Props {
  locale: string;
  content: any;
}

const UpdateToast = ({ locale, content }: Props) => {
  console.log(content[0].data.content.Default);
  return (
    <div className="flex flex-col text-xs gap-1 font-robotoFlex">
      <p className="">{localizedStaticContent.currentlyToast[locale]}</p>
      <p className="text-black text-base">
        {content.map((element:any) => <p>- {locale === "en"
          ? element.data.content.Default
          : element.data.content[locale]}</p>)}
      </p>
    </div>
  );
};

export default UpdateToast;
