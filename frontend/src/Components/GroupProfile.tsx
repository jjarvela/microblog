import { useLocation } from "react-router";
import GroupProfileBanner from "./Elements/GroupProfileBanner";
import Post from "./Elements/Post";
import FeaturedMediaPost from "./Elements/FeaturedMediaPost";

function GroupProfile() {
  const { state } = useLocation(); // Gets the groupName from the url
  const groupName = state?.groupName;
  return (
    <div>
      <div className="mb-8">
        <GroupProfileBanner groupName={groupName} />
      </div>

      <div className="grid grid-cols-2">
        <Post
          profileName="Test User ✨"
          postOwner="@testuser"
          text="That IS indeed a very cool post!"
          reactions={3}
          tags={["#nice"]}
          time={new Date()}
          ownerOptions
          pinnedPost
        />

        <FeaturedMediaPost
          profileName="Fancy User"
          postOwner="@fancyuser"
          media={[
            {
              id: "32j423j4",
              source:
                "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb",
              type: "img",
            },
          ]}
          tags={["#twopics"]}
          time={new Date()}
        />

        <Post
          profileName="Fancy User"
          postOwner="@fancyuser"
          text="This post has pictures"
          media={[
            {
              id: "32j423j4",
              source:
                "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb",
              type: "img",
            },
            {
              id: "1434j4",
              source:
                "https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              type: "img",
            },
          ]}
          reactions={1}
          tags={["#twopics"]}
          time={new Date()}
        />
      </div>
    </div>
  );
}

export default GroupProfile;
