import { useContext } from "react";
import { UserContext } from "./UserPage";
import Post from "./Elements/Post";

function UserPosts() {
  const user = useContext(UserContext);

  return (
    <div className="my-4">
      <h2 className="my-4 text-center">{user.screenName}'s Posts</h2>
      <div className="flex flex-col gap-4">
        <Post
          profileName={user.screenName}
          postOwner={user.userName}
          text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus accusantium, repellendus tempore minima sit quam cum architecto dolores excepturi iure recusandae! Voluptatibus suscipit cupiditate tenetur eveniet deserunt consequatur tempore distinctio."
          reactions={42}
          tags={["hashtag", "longerhashtag", "tag"]}
          time={new Date()}
          media={[]}
          ownerOptions
        />

        <Post
          profileName={user.screenName}
          postOwner={user.userName}
          text="This past week was very exiting. I bought a coconut!"
          reactions={3}
          tags={["coconuts", "are", "cool"]}
          media={[]}
          time={new Date()}
          ownerOptions
        />

        <Post
          profileName={user.screenName}
          postOwner={user.userName}
          text="Here are some pictures"
          media={[
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
          ]}
          reactions={1}
          tags={["pics", "are", "cool"]}
          time={new Date()}
          ownerOptions
        />

        <Post
          profileName={user.screenName}
          postOwner={user.userName}
          text={user.featuredPost?.text || ""}
          media={user.featuredPost?.media || []}
          reactions={user.featuredPost?.reactions || 0}
          tags={user.featuredPost?.tags || []}
          time={user.featuredPost?.time || new Date()}
          ownerOptions
        />
      </div>
    </div>
  );
}

export default UserPosts;