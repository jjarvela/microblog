import PostMediaLayout from "./PostMediaLayout";
import PostContextMenu from "./PostContextMenu";
import { createContext } from "react";
import PostPin from "./PostPin";

export const PostContext = createContext<Post>({
  profileName: "",
  postOwner: "",
  tags: [],
  time: new Date(),
  media: undefined,
  text: "",
  reactions: 0,
});

type PostProps = {
  profileName: string;
  postOwner: string;
  media?: Array<Media> | undefined;
  tags: string[];
  time: Date;
  ownerOptions?: boolean;
  pinnedPost?: boolean;
};

function FeaturedMediaPost({
  profileName,
  postOwner,
  tags,
  time,
  media,
  ownerOptions,
  pinnedPost,
}: PostProps) {
  return (
    <PostContext.Provider
      value={{
        profileName,

        postOwner,

        tags,
        time,
        media,
        text: "", // Add a default value for text
        reactions: 0, // Add a default value for reactions
      }}
    >
      <div className="timeline-box relative flex flex-col overflow-hidden">
        <h3 className="mb-2 text-center">Featured Media</h3>
        <h5 className="mb-2 text-center">{postOwner}</h5>
        {pinnedPost ? (
          <div className="-mx-3 mb-4 flex flex-row justify-end border-b border-black25 p-2 px-6 pb-1 dark:border-white25">
            <PostPin />
          </div>
        ) : null}

        <div className="flex flex-row items-center gap-4">
          <PostContextMenu
            class="absolute right-3 top-3"
            ownerOptions={ownerOptions}
          />
        </div>

        {media ? <PostMediaLayout media={media} /> : null}

        <p className="flex flex-row gap-4">
          {tags.map((val, i) => (
            <a key={i}>{val}</a>
          ))}
        </p>
      </div>
    </PostContext.Provider>
  );
}

export default FeaturedMediaPost;
