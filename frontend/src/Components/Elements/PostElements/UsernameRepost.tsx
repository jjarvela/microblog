import { Link } from "react-router-dom";

type UsernameRepostProps = {
  username: string;
};

function UsernameRepost(props: UsernameRepostProps) {
  return (
    <div className="mb-1 flex">
      <div>
        <p className="text-black50">
          <Link to={`/user/${props.username}`}> @{props.username}</Link>{" "}
          reposted
        </p>
      </div>
    </div>
  );
}

export default UsernameRepost;
