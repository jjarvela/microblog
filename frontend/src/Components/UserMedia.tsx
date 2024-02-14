import PostMedia from "./Elements/PostElements/PostMedia";
import { PostContext } from "./Elements/PostElements/Post";
import { useUser } from "../UserWrapper";

const mockMediaList: Media[] = [
  {
    id: "32j423j4",
    source: "https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg",
    type: "img",
  },
  {
    id: "1434j4",
    source:
      "https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg",
    type: "img",
  },
  {
    id: "asdf",
    type: "img",
    source:
      "https://images.pexels.com/photos/1174108/pexels-photo-1174108.jpeg",
  },
];

function UserMedia() {
  const user = useUser().user;

  return (
    <PostContext.Provider
      value={{
        postOwner: {
          screenName: user?.screenName || "",
          userName: user?.screenName || "",
        },
        tags: [],
        time: new Date(),
        media: [],
        text: "",
        reactions: 0,
      }}
    >
      <div className="m-4">
        <h2 className="my-4 text-center">{user?.screenName}'s Media</h2>
        <div className="grid grid-flow-row grid-cols-2 gap-4">
          {mockMediaList.map((media, i) => {
            return (
              <div
                key={i}
                className="overflow-hidden rounded-xl border border-black50"
              >
                <PostMedia
                  media={media}
                  index={i}
                  class="static h-[10rem] sm:h-[20rem]"
                />
              </div>
            );
          })}
        </div>
      </div>
    </PostContext.Provider>
  );
}

export default UserMedia;
