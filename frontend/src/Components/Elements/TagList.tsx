type TagListProps = {
  tags: string[];
  style?: string;
};

function TagList({ tags, style }: TagListProps) {
  return (
    <p className={"flex flex-row flex-wrap gap-x-4 gap-y-2" + " " + style}>
      {tags.map((val, i) => (
        <a key={i}>#{val}</a>
      ))}
    </p>
  );
}

export default TagList;
