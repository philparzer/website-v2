import { useRouter } from "next/router";
import { useState } from "react";
import {
  useFloating,
  useInteractions,
  useDismiss,
  offset,
  flip,
  shift,
  FloatingOverlay
} from "@floating-ui/react-dom-interactions";
import { useEffect } from "react";

interface Props {
  locale: string
}

export default function LanguageSelect({locale}: Props) {
  const [open, setOpen] = useState(false);
  const { x, y, reference, floating, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom",
    strategy: "fixed",
    middleware: [offset(15), flip(), shift()],
  });

  const dismiss = useDismiss(context, {});

  const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

  const router = useRouter();
  const { pathname, asPath, query } = router;

  const handleClick = (locale: string) => {
    router.push({ pathname, query }, asPath, { locale });
    setOpen(false)
  };

  return (
    <div className="flex items-center">
      <button ref={reference} className="flex items-center gap-1 group p-1 px-3" onClick={() => setOpen(!open)}>
      <svg width="18" height="18" className={`group-hover:fill-white ${open ? "fill-white" : "fill-main-black"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12m2.557 16h-5.115c.546 2.46 1.441 4.114 2.558 5.744 1.194-1.741 2.041-3.41 2.557-5.744m-7.157 0h-4.567c1.236 2.825 3.704 4.972 6.755 5.716-1.048-1.733-1.783-3.658-2.188-5.716m13.767 0h-4.567c-.391 1.988-1.095 3.887-2.175 5.694 3.012-.763 5.517-2.895 6.742-5.694m-14.005-6h-4.962c-.267 1.313-.267 2.685 0 4h4.915c-.119-1.329-.101-2.672.047-4m7.661 0h-5.647c-.165 1.326-.185 2.672-.053 4h5.753c.133-1.328.111-2.673-.053-4m6.977 0h-4.963c.148 1.328.166 2.671.048 4h4.915c.26-1.285.273-2.648 0-4m-12.156-7.729c-3.077.732-5.567 2.886-6.811 5.729h4.653c.435-2.042 1.178-3.985 2.158-5.729m2.355-.048c-1.089 1.77-1.91 3.453-2.463 5.777h4.927c-.534-2.246-1.337-3.948-2.464-5.777m2.368.069c1.013 1.812 1.733 3.76 2.146 5.708h4.654c-1.232-2.816-3.762-4.958-6.8-5.708"/></svg>
      <span className={`text-sm group-hover:text-white ${open ? "text-white" : "text-main-black"}`}>{locale?.toUpperCase()}</span>
      </button>

      {open && (
        
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            width: "max-content",
          }}
          className="flex flex-col gap-1 text-md font-roboto-flex bg-white p-4 rounded-[30px]"
        >
          <button className="p-1 px-3 rounded-full hover:bg-main-black hover:text-white bg-white text-md" onClick={() => handleClick("ru")}>Русский</button>
          <button className="p-1 px-3 rounded-full hover:bg-main-black hover:text-white  bg-white" onClick={() => handleClick("en")}>English</button>
          <button className="p-1 px-3 rounded-full hover:bg-main-black hover:text-white  bg-white" onClick={() => handleClick("de")}>Deutsch</button>
        </div>
        
      )}
      
    </div>
  );
}
