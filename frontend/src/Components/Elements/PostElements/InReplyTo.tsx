import { Link } from "react-router-dom";

type InReplyToProps = {
  username: string;
};

function InReplyTo(props: InReplyToProps) {
  return (
    <div className="-mx-3 mt-4 flex flex-row justify-start border-y border-black25 px-4 py-4 dark:border-white25">
      <div>
        <p className="text-black50">
          In reply to{" "}
          <Link to={`/user/${props.username}`}>{props.username}</Link>
          's post
        </p>
      </div>
    </div>
  );
}

export default InReplyTo;
