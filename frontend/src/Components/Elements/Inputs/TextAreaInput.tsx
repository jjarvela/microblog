import { useState } from "react";

type TextAreaInputProps = {
  text?: string;
  placeholder?: string;
  maxLength?: number;
  showCount?: boolean;
  class?: string;
  autofocus?: boolean;
};

function TextAreaInput({
  text,
  placeholder,
  maxLength,
  showCount,
  class: classAdd,
  autofocus,
}: TextAreaInputProps) {
  const [charCount, setCharCount] = useState(0);
  const [newText, setNewText] = useState(text);
  return (
    <div className="relative">
      <textarea
        className={
          "scrollbar-thin scrollbar-extra-margin resize-none rounded-2xl border border-black50 bg-white px-2 py-1 outline-1 hover:border-black75 focus:border-primary focus:shadow-[0px_0px_5px_2px_var()] focus:shadow-primary focus:outline-none dark:bg-black dark:hover:border-black25" +
          " " +
          classAdd
        }
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => {
          setNewText(e.target.value);
          setCharCount(e.target.value.length);
        }}
        value={newText}
        autoFocus={autofocus || false}
      />
      {showCount && (
        <p className="absolute bottom-3 right-2 select-none text-black50">
          {charCount} / {maxLength}
        </p>
      )}
    </div>
  );
}

export default TextAreaInput;
