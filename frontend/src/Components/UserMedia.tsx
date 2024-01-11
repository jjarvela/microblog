import { useContext } from "react";
import { UserContext } from "./UserPage";

function UserMedia() {
  const user = useContext(UserContext);

  return <h2 className="my-4 text-center">{user.screenName}'s Media</h2>;
}

export default UserMedia;
