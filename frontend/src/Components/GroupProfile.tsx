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

      <div className="grid grid-cols-1 gap-4">
        <Post
          postOwner={{
            userName: "@testuser",
            screenName: "Test User ✨",
            followers: 5,
            following: 23,
          }}
          text="That IS indeed a very cool post!"
          reactions={3}
          tags={["nice"]}
          time={new Date()}
          ownerOptions
          pinnedPost
          media={[]}
        />

        <FeaturedMediaPost
          postOwner={{
            userName: "@fancyuser",
            screenName: "Fancy User",
            followers: 526,
            following: 1893,
          }}
          media={[
            {
              id: "32j423j4",
              source:
                "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb",
              type: "img",
            },
          ]}
          tags={["twopics"]}
          time={new Date()}
        />

        <Post
          postOwner={{
            userName: "@fancyuser",
            screenName: "Fancy User",
            followers: 526,
            following: 1893,
          }}
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
          tags={["twopics"]}
          time={new Date()}
        />

        <Post
          postOwner={{
            userName: "@fancyuser",
            screenName: "Fancy User",
            followers: 526,
            following: 1893,
          }}
          text="This post has a video"
          media={[
            {
              id: "5rttryrt",
              source:
                "https://va.media.tumblr.com/tumblr_s5wiv6nqZf1z8ckep.mp4",
              type: "vid",
            },
          ]}
          reactions={1}
          tags={["catvid"]}
          time={new Date()}
        />

        <Post
          postOwner={{
            userName: "@fancyuser",
            screenName: "Fancy User",
            followers: 526,
            following: 1893,
          }}
          text="This post has pictures"
          media={[
            {
              id: "32j423j4",
              source:
                "https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              type: "img",
            },
            {
              id: "1434j4",
              source:
                "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb",
              type: "img",
            },
            {
              id: "5rttryrt",
              source:
                "https://va.media.tumblr.com/tumblr_s5wiv6nqZf1z8ckep.mp4",
              type: "vid",
            },
          ]}
          reactions={1}
          tags={["coolpics", "myphotos"]}
          time={new Date()}
        />
      </div>
    </div>
  );
}

export default GroupProfile;
