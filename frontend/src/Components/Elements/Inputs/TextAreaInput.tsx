import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

interface TextAreaInputProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  text?: string;
  charCount?: number;
  placeholder?: string;
  maxLength?: number;
  showCount?: boolean;
  class?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  autofocus?: boolean;
}

function TextAreaInput({
  charCount,
  maxLength,
  showCount,
  class: classAdd,
  ...rest
}: TextAreaInputProps) {
  return (
    <div className="relative">
      <textarea
        className={
          "scrollbar-thin scrollbar-extra-margin resize-none rounded-2xl border border-black50 bg-white px-2 py-1 outline-1 hover:border-black75 focus:border-primary focus:shadow-[0px_0px_5px_2px_var()] focus:shadow-primary focus:outline-none dark:bg-black dark:hover:border-black25" +
          " " +
          classAdd
        }
        maxLength={maxLength}
        {...rest}
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
