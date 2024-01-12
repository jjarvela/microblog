import PostMediaLayout from "./PostMediaLayout";
import PostContextMenu from "./PostContextMenu";
import PostPin from "./PostPin";
import TagList from "./TagList";
import { PostContext } from "./Post";

type PostProps = {
  profileName: string;
  postOwner: string;
  profileImage?: string;
  media?: Array<Media> | undefined;
  tags: string[];
  time: Date;
  ownerOptions?: boolean;
  pinnedPost?: boolean;
  class?: string;
  text?: string;
  reactions?: number;
};

function FeaturedMediaPost({
  profileName,
  postOwner,
  profileImage,
  tags,
  time,
  media,
  ownerOptions,
  pinnedPost,
  class: classAdd,
  text,
  reactions,
}: PostProps) {
  return (
    <PostContext.Provider
      value={{
        profileName,
        profileImage,
        postOwner,
        tags,
        time,
        media: media || [],
        text: text || "", // Add a default value for text
        reactions: reactions || 0, // Add a default value for reactions
      }}
    >
      <div
        className={
          "timeline-box relative flex flex-col gap-2 overflow-hidden" +
          " " +
          classAdd
        }
      >
        <div className="flex flex-row items-center gap-4">
          <PostContextMenu
            class="absolute right-3 top-3"
            ownerOptions={ownerOptions}
          />
        </div>
        <h3 className="text-center">Featured Media</h3>
        <h5 className="text-center">{profileName}</h5>
        {pinnedPost ? (
          <div className="-mx-3 mb-4 flex flex-row justify-end border-b border-black25 p-2 px-6 pb-1 dark:border-white25">
            <PostPin />
          </div>
        ) : null}

        {media ? <PostMediaLayout media={media} /> : null}

        <TagList tags={tags} class="mx-5 my-2" />
      </div>
    </PostContext.Provider>
  );
}

export default FeaturedMediaPost;
