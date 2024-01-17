import { useEffect, useRef, useState } from "react";
import TagBox from "./TagBox";

type TagInputProps = {
  tags: string[];
  onTagsChanged: (tags: string[]) => void;
  maxTags: number;
  maxTagLength: number;
  showCount?: boolean;
  class?: string;
};

function TagInput({
  tags,
  onTagsChanged,
  maxTags,
  maxTagLength,
  showCount,
  class: classAdd,
}: TagInputProps) {
  const [newTag, setNewTag] = useState("");
  const [newTags, setNewTags] = useState(tags);
  const tagInput = useRef<HTMLInputElement>(null);

  const handleTagDelete = (index: number) => {
    // Workaround: toSpliced is a thing, but not supported completely yet.
    onTagsChanged(newTags.splice(index, 1));
  };
  useEffect(() => {
    if (newTag.endsWith(",") || newTag.endsWith(" ")) {
      if (newTags.length < maxTags) {
        setNewTags([...newTags, newTag.substring(0, newTag.length - 1)]);
        setNewTag("");
      } else {
        setNewTag(newTag.substring(0, newTag.length - 1));
      }
    } else {
      setNewTag(newTag.substring(0, maxTagLength));
    }
  }, [newTag, newTags, maxTagLength, maxTags]);
  return (
    <div
      className={
        "relative flex cursor-text resize-none flex-row flex-wrap items-baseline gap-1 rounded-xl border border-black50 bg-white p-2 outline-1 focus-within:border-primary focus-within:shadow-[0px_0px_5px_2px_var()] focus-within:shadow-primary focus-within:outline-none hover:border-black75 focus-within:hover:border-primary hover:focus-within:border-black75 dark:bg-black dark:hover:border-black25 dark:hover:focus-within:border-black25" +
        " " +
        classAdd
      }
      onClick={() => {
        if (tagInput.current) {
          tagInput.current.focus();
        }
      }}
    >
      {newTags.map((val, i) => (
        <TagBox text={val} key={i} onDelete={() => handleTagDelete(i)} />
      ))}
      {showCount && (
        <p className="absolute bottom-1 right-2 select-none text-black50">
          {newTags.length} / {maxTags}
        </p>
      )}
      <input
        onChange={(e) => setNewTag(e.currentTarget.value)}
        placeholder="Add tag..."
        className="flex-1 rounded-none border-0 p-0 hover:border-0 focus:border-0 focus:shadow-none focus:outline-none dark:hover:border-0"
        value={newTag}
        maxLength={maxTagLength + 1}
        ref={tagInput}
        onKeyDown={(e) => {
          if (e.key == "Backspace" && !newTag)
            handleTagDelete(newTags.length - 1);
        }}
      ></input>
    </div>
  );
}

export default TagInput;
