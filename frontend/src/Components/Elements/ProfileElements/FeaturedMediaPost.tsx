import PostMediaLayout from "../PostElements/PostMediaLayout";
import PostContextMenu from "../PostElements/PostContextMenu";
import PostPin from "../PostElements/PostPin";
import TagList from "../PostElements/TagList";
import { PostContext } from "../PostElements/Post";

type PostProps = {
  postOwner: User;
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
  postOwner,
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
        <h5 className="text-center">{postOwner.screenName}</h5>
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
