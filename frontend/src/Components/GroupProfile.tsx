import { useLocation } from "react-router";
import GroupProfileBanner from "./Elements/ProfileElements/GroupProfileBanner";
import Post from "./Elements/PostElements/Post";
import FeaturedMediaPost from "./Elements/ProfileElements/FeaturedMediaPost";
import { useEffect } from "react";
import GroupMembersBox from "./Elements/ProfileElements/GroupMembersBox";

function GroupProfile() {
  const { state } = useLocation(); //gets the entire group object that group thumbnail passes to state
  const group = state?.group;
  //!!will result in 404 if navigation is not done from a group thumbnail

  const placeholderPosts: Post[] = [
    {
      postOwner: {
        userName: "@fancyuser",
        screenName: "Fancy User",
        followers: 526,
        following: 1893,
      },
      text: "This post has a video",
      media: [
        {
          id: "5rttryrt",
          source: "https://va.media.tumblr.com/tumblr_s5wiv6nqZf1z8ckep.mp4",
          type: "vid",
        },
      ],
      reactions: 1,
      tags: ["catvid"],
      time: new Date(),
    },
    {
      postOwner: {
        userName: "@fancyuser",
        screenName: "Fancy User",
        followers: 526,
        following: 1893,
      },
      text: "This post has pictures",
      media: [
        {
          id: "32j423j4",
          source:
            "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg",
          type: "img",
        },
        {
          id: "1434j4",
          source:
            "https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg",
          type: "img",
        },
      ],
      reactions: 1,
      tags: ["twopics"],
      time: new Date(),
    },
    {
      postOwner: {
        userName: "@fancyuser",
        screenName: "Fancy User",
        followers: 526,
        following: 1893,
      },
      text: "This post has pictures",
      media: [
        {
          id: "32j423j4",
          source:
            "https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg",
          type: "img",
        },
        {
          id: "1434j4",
          source:
            "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg",
          type: "img",
        },
        {
          id: "5rttryrt",
          source: "https://va.media.tumblr.com/tumblr_s5wiv6nqZf1z8ckep.mp4",
          type: "vid",
        },
      ],
      reactions: 1,
      tags: ["coolpics", "myphotos"],
      time: new Date(),
    },

    {
      postOwner: {
        userName: "@fancyuser",
        screenName: "Fancy User",
        followers: 526,
        following: 1893,
      },
      text: "This post has pictures",
      media: [
        {
          id: "5erryrt",
          source: "https://va.media.tumblr.com/tumblr_s5wiv6nqZf1z8ckep.mp4",
          type: "vid",
        },

        {
          id: "32j423j4",
          source:
            "https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg",
          type: "img",
        },
        {
          id: "1434j4",
          source:
            "https://images.pexels.com/photos/1008737/pexels-photo-1008737.jpeg",
          type: "img",
        },
        {
          id: "5r3243",
          source: "https://va.media.tumblr.com/tumblr_s5wiv6nqZf1z8ckep.mp4",
          type: "vid",
        },
      ],
      reactions: 1,
      tags: ["fourpics"],
      time: new Date(),
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="mb-8">
        {group ? (
          <GroupProfileBanner group={group} />
        ) : (
          <div>
            <p>Loading...</p>
            {/* or show an error message */}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <GroupMembersBox />
        <Post
          post={{
            postOwner: {
              userName: "@testuser",
              screenName: "Test User ✨",
              followers: 5,
              following: 23,
            },
            text: "That IS indeed a very cool post!",
            reactions: 3,
            tags: ["nice"],
            time: new Date(),
            media: [],
          }}
          pinnedPost
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

        {placeholderPosts.map((post) => {
          return (
            <Post
              key={post.postOwner.userName + Math.floor(Math.random() * 1000)}
              post={post}
            />
          );
        })}
      </div>
    </div>
  );
}

export default GroupProfile;
