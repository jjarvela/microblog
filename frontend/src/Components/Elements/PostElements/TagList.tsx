import { Link } from "react-router-dom";

type TagListProps = {
  tags: string[];
  class?: string;
};

function TagList({ tags, class: classList }: TagListProps) {
  return (
    <p className={"flex flex-row flex-wrap gap-x-4 gap-y-2" + " " + classList}>
      {tags.map((val, i) => (
        <Link to={`/search?q=${val}`} key={i}>
          #{val}
        </Link>
      ))}
    </p>
  );
}

export default TagList;
