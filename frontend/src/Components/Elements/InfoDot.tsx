import { useState } from "react";

type InfoDotProps = {
  text: string;
};

function InfoDot({ text }: InfoDotProps) {
  const [showText, setShowText] = useState(false);
  return (
    <div
      className="relative flex h-4 w-4 items-baseline justify-center rounded-full bg-black50 text-sm font-bold"
      onMouseEnter={() => setShowText(true)}
      onMouseLeave={() => setShowText(false)}
    >
      i
      {showText && (
        <div className="absolute left-0 top-[150%] z-50 -translate-x-[min(75%,_calc(25vw_+_100%))] whitespace-normal rounded-lg border border-black50 bg-black25 px-2 py-1 dark:bg-white25 sm:left-[150%] ">
          <p className="min-w-[10rem] text-center text-sm font-normal sm:min-w-[16rem]">
            {text}
          </p>
        </div>
      )}
    </div>
  );
}

export default InfoDot;
