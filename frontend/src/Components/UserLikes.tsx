//import Post from "./Elements/PostElements/Post";
import { ProfileContext } from "./UserPage";
import { useContext } from "react";

function UserLikes() {
  const profile = useContext(ProfileContext);

  return (
    <div className="my-4">
      <h2 className="my-4 text-center">
        {profile.details?.screenName}'s Likes
      </h2>
      {/*<Post
        post={}
        topInfo={profile.details?.userName + " liked this"}
  />*/}
    </div>
  );
}

export default UserLikes;
