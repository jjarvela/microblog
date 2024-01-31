import { useContext } from "react";
import { UserProfileContext } from "./UserPage";
import Post from "./Elements/PostElements/Post";

function UserLikes() {
  const user = useContext(UserProfileContext);

  return (
    <div className="my-4">
      <h2 className="my-4 text-center">{user.screenName}'s Likes</h2>
      <Post
        post={{
          postOwner: {
            userName: "@madasitgets",
            screenName: "Outraged user 951 😤",
            followers: 487,
            following: 794,
          },
          text: "I'm saying something very controversial! You should definitely not share this anywhere online, but we can't understand that because technology melted our collective brains.",
          reactions: 99999,
          tags: ["AngryAtEverything", "ExceptWhatIsActuallyWrong"],
          media: [],
          time: new Date(),
        }}
        topInfo={user.userName + " liked this"}
      />
    </div>
  );
}

export default UserLikes;
