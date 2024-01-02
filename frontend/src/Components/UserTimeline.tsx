import MediaPost from "./Elements/MediaPost";
import Post from "./Elements/Post";

const UserTimeline = () => {
  return (
    <>
      <h2 className="my-4 text-center">Timeline</h2>
      <div className="flex flex-col gap-4">
        <Post
          profileName="Test User ✨"
          username="@testuser"
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus accusantium, repellendus tempore minima sit quam cum architecto dolores excepturi iure recusandae! Voluptatibus suscipit cupiditate tenetur eveniet deserunt consequatur tempore distinctio."
          reactions={42}
          tags={["#hashtag", "#longerhashtag", "#tag"]}
          time={new Date()}
        />
        <Post
          profileName="Another User 🙂"
          username="@anotheruser"
          text="Hello this is my very cool post!"
          reactions={3}
          tags={["#help", "#me", "#thanks"]}
          time={new Date()}
        />

        <MediaPost
          profileName="Fancy User"
          username="@fancyuser"
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
                "https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
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
      </div>
    </>
  );
};

export default UserTimeline;
