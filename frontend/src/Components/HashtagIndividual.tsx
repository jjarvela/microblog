import { useLocation } from "react-router";
import Button from "./Elements/Button";
import Post from "./Elements/PostElements/Post";

export default function HashtagIndividual() {
  const location = useLocation();
  //extract the tag from the pathname
  const tag = location.pathname.substring(9);

  const tempPosts: Post[] = [
    {
      postOwner: {
        userName: "@testuser",
        screenName: "Test User ✨",
        followers: 5,
        following: 23,
      },
      text: "This post is in the trending",
      media: [],
      reactions: 52,
      tags: ["lookmomimtrending", tag],
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
      tags: ["twopics", tag],
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
      tags: ["twopics", tag],
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
      reactions: 34,
      tags: ["coolpics", "myphotos", tag],
      time: new Date(),
    },
  ];

  return (
    <div className="mx-auto">
      <div className=" mb-4 flex flex-wrap justify-center gap-2">
        <h3 className="text-primary">#{tag}</h3>
        <Button class="btn-primary">Follow</Button>
      </div>
      <div className="flex flex-col gap-4">
        {tempPosts.map((post) => {
          return (
            <Post
              key={
                Math.floor(Math.random() * 1000) +
                "-" +
                Math.floor(Math.random() * 1000)
              }
              post={post}
            />
          );
        })}
      </div>
    </div>
  );
}
