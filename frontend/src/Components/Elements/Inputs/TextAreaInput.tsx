import {
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
} from "react";

interface TextAreaInputProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  showCount?: boolean;
  className?: string;
  autofocus?: boolean;
  grow?: boolean;
}

function TextAreaInput({
  value,
  maxLength,
  showCount,
  autofocus,
  className: className,
  grow,
  ...rest
}: TextAreaInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (grow && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 2 // Magic number to hide scrollbar
      }px`;
    }
  });
  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        className={
          "scrollbar-thin scrollbar-extra-margin resize-none rounded-2xl border border-black50 bg-white px-2 py-1 outline-1 hover:border-black75 focus:border-primary focus:shadow-[0px_0px_5px_2px_var()] focus:shadow-primary focus:outline-none dark:bg-black dark:hover:border-black25" +
          " " +
          className
        }
        maxLength={maxLength}
        autoFocus={autofocus || false}
        {...rest}
      />
      {showCount && (
        <p className="absolute bottom-3 right-2 select-none text-black50">
          {typeof value === "string" && value?.length} / {maxLength}
        </p>
      )}
    </div>
  );
}

export default TextAreaInput;
