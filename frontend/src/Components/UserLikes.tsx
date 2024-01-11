import { useContext } from "react";
import { UserContext } from "./UserPage";

function UserLikes() {
  const user = useContext(UserContext);

  return <h2 className="my-4 text-center">{user.screenName}'s Likes</h2>;
}

export default UserLikes;
