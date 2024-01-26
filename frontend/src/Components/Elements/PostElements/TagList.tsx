import Hashtag from "../Hashtag";

type TagListProps = {
  tags: string[];
  class?: string;
};

function TagList({ tags, class: classList }: TagListProps) {
  return (
    <p className={"flex flex-row flex-wrap gap-x-4 gap-y-2" + " " + classList}>
      {tags.map((val, i) => (
        <Hashtag key={i} tag={val} />
      ))}
    </p>
  );
}

export default TagList;
