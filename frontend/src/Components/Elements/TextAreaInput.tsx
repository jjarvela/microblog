import { useRef, useState } from "react";

type TextAreaInputProps = {
  text?: string;
  placeholder?: string;
  maxLength?: number;
  showCount?: boolean;
};

function TextAreaInput({
  text,
  placeholder,
  maxLength,
  showCount,
}: TextAreaInputProps) {
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const [charCount, setCharCount] = useState(0);
  return (
    <div className="relative">
      <textarea
        className="min-h-[20rem] w-full resize-none rounded-xl border-2 border-black50 bg-white px-2 py-1 outline-1 hover:border-black75 focus:border-black75 focus:outline-none dark:bg-black"
        placeholder={placeholder}
        maxLength={maxLength}
        ref={areaRef}
        onChange={() =>
          setCharCount(areaRef.current ? areaRef.current.textLength : 0)
        }
      >
        {text}
      </textarea>
      {showCount && (
        <p className="absolute bottom-3 right-2 select-none text-black50">
          {charCount} / {maxLength}
        </p>
      )}
    </div>
  );
}

export default TextAreaInput;
