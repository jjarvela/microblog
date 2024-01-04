import Post from "./Elements/Post";

const UserTimeline = () => {
  return (
    <>
      <h2 className="my-4 text-center">Timeline</h2>
      <div className="flex flex-col gap-4">
        <Post
          profileName="Test User ✨"
          postOwner="@testuser"
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus accusantium, repellendus tempore minima sit quam cum architecto dolores excepturi iure recusandae! Voluptatibus suscipit cupiditate tenetur eveniet deserunt consequatur tempore distinctio."
          reactions={42}
          tags={["#hashtag", "#longerhashtag", "#tag"]}
          time={new Date()}
        />
        <Post
          profileName="Another User 🙂"
          postOwner="@anotheruser"
          text="Hello this is my very cool post!"
          reactions={3}
          tags={["#help", "#me", "#thanks"]}
          time={new Date()}
        />

        <Post
          profileName="Another User 🙂"
          postOwner="@anotheruser"
          reposter="@testuser"
          text="Hello this is my very cool post!"
          reactions={3}
          tags={["#help", "#me", "#thanks"]}
          time={new Date()}
        />

        <Post
          profileName="Test User ✨"
          postOwner="@testuser"
          replyingTo="@anotheruser"
          text="That IS indeed a very cool post!"
          reactions={3}
          tags={["#nice"]}
          time={new Date()}
        />

        <Post
          profileName="Fancy User"
          postOwner="@fancyuser"
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
          tags={["#catvid"]}
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

        <Post
          profileName="Fancy User"
          postOwner="@fancyuser"
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
          tags={["#coolpics", "#myphotos"]}
          time={new Date()}
        />

        <Post
          profileName="Fancy User"
          postOwner="@fancyuser"
          text="This post has pictures"
          media={[
            {
              id: "5erryrt",
              source:
                "https://va.media.tumblr.com/tumblr_s5wiv6nqZf1z8ckep.mp4",
              type: "vid",
            },

            {
              id: "32j423j4",
              source:
                "https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
              source:
                "https://va.media.tumblr.com/tumblr_s5wiv6nqZf1z8ckep.mp4",
              type: "vid",
            },
          ]}
          reactions={1}
          tags={["#fourpics"]}
          time={new Date()}
        />
      </div>
    </>
  );
};

export default UserTimeline;
