import Post from "./Elements/PostElements/Post";
import { ProfileContext } from "./UserPage";
import { useContext } from "react";

function UserLikes() {
  const profile = useContext(ProfileContext);

  return (
    <div className="my-4">
      <h2 className="my-4 text-center">
        {profile.details?.screenName}'s Likes
      </h2>
      <Post
        post={{
          postOwner: {
            userName: "@madasitgets",
            screenName: "Outraged user 951 😤",
            followers: [],
            following: [],
          },
          text: "I'm saying something very controversial! You should definitely not share this anywhere online, but we can't understand that because technology melted our collective brains.",
          reactions: 99999,
          tags: ["AngryAtEverything", "ExceptWhatIsActuallyWrong"],
          media: [],
          time: new Date(),
        }}
        topInfo={profile.details?.userName + " liked this"}
      />
    </div>
  );
}

export default UserLikes;
