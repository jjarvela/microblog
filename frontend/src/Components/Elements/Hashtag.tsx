import { Link } from "react-router-dom";

export default function Hashtag({
  tag,
  children,
}: {
  tag: string;
  children?: React.ReactNode;
}) {
  return (
    <Link to={`/hashtag/${tag}`} className="link">
      {children ? children : <p>#{tag}</p>}
    </Link>
  );
}
