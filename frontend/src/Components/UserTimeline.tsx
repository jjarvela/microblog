import { Routes, Route, Navigate } from "react-router";
import FollowedGroups from "./Elements/FollowedGroups";
import FollowedHashtags from "./Elements/FollowedHashtags";
import FollowedUsers from "./Elements/FollowedUsers";
import Post from "./Elements/PostElements/Post";
import TopPageNav from "./Elements/TopPageNav";
import MaterialSymbolsPersonCheck from "./Icons/MaterialSymbolsPersonCheck";
import IonRibbonB from "./Icons/IonRibbonB";
import MaterialSymbolsTagRounded from "./Icons/MaterialSymbolsTagRounded";
import { useUser } from "../UserWrapper";

const UserTimeline = () => {
  const user = useUser().user;

  const placeholderPosts: Post[] = [
    {
      postOwner: {
        userName: "@testuser",
        screenName: "Test User ✨",
        followers: 5,
        following: 23,
      },
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus accusantium, repellendus tempore minima sit quam cum architecto dolores excepturi iure recusandae! Voluptatibus suscipit cupiditate tenetur eveniet deserunt consequatur tempore distinctio.",
      reactions: 42,
      tags: ["hashtag", "longerhashtag", "tag"],
      time: new Date(),
      media: [],
    },
    {
      postOwner: {
        userName: "@anotheruser",
        screenName: "Another User 🙂",
        followers: 1,
        following: 37,
      },
      text: "Hello this is my very cool post!",
      reactions: 3,
      tags: ["help", "me", "thanks"],
      media: [],
      time: new Date(),
    },
    {
      postOwner: user || {
        userName: "@dickerson99",
        screenName: "Dickerson",
        followers: 4,
        following: 12,
      },
      text: "I'm the bestest dummy account around",
      reactions: 3,
      tags: ["yea", "it's me alright"],
      media: [],
      time: new Date(),
    },
    {
      postOwner: {
        userName: "@anotheruser",
        screenName: "Another User 🙂",
        followers: 1,
        following: 37,
      },
      reposter: "@testuser",
      text: "Hello this is my very cool post!",
      reactions: 3,
      tags: ["help", "me", "thanks"],
      media: [],
      time: new Date(),
    },
    {
      postOwner: {
        userName: "@testuser",
        screenName: "Test User ✨",
        followers: 5,
        following: 23,
      },
      replyingTo: "@anotheruser",
      text: "That IS indeed a very cool post!",
      reactions: 3,
      tags: ["nice"],
      time: new Date(),
      media: [],
    },
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
  return (
    <>
      <div className="flex basis-4/12 justify-center">
        <TopPageNav
          destination="following"
          linkName="Following"
          icon={MaterialSymbolsPersonCheck}
        />
        <TopPageNav
          destination="originals"
          linkName="Originals"
          icon={IonRibbonB}
        />
        <TopPageNav
          destination="mytags"
          linkName="My Tags"
          icon={MaterialSymbolsTagRounded}
        />
      </div>
      <h2 className="my-4 text-center">Timeline</h2>
      <div className="flex flex-col gap-4">
        {placeholderPosts.map((post) => {
          return (
            <Post
              key={post.postOwner.userName + Math.floor(Math.random() * 1000)}
              post={post}
            />
          );
        })}
      </div>
      <div className="scrollbar-thin overflow-y-auto">
        <Routes>
          <Route index element={<Navigate to={"following"} />} />
          <Route path="people" element={<FollowedUsers />} />
          <Route path="groups" element={<FollowedGroups />} />
          <Route path="hashtags" element={<FollowedHashtags />} />
        </Routes>
      </div>
    </>
  );
};

export default UserTimeline;
