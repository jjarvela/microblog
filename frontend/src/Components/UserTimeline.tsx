import Post from "./Elements/Post";
import PostCommentForm from "./PostCommentForm";

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
      </div>
      <div className="flex flex-col gap-4">
        <PostCommentForm
          profileName="UserPerson ^__^"
          username="@dickerson99"
          text="Hi mom! I'm in Internet!!"
        />
      </div>
    </>
  );
};

export default UserTimeline;
