import MaterialSymbolsChatOutlineRounded from "../Icons/MaterialSymbolsChatOutlineRounded";
import MaterialSymbolsFavoriteOutlineRounded from "../Icons/MaterialSymbolsFavoriteOutlineRounded";
import MaterialSymbolsFlagRounded from "../Icons/MaterialSymbolsFlagRounded";
import MaterialSymbolsShareOutline from "../Icons/MaterialSymbolsShareOutline";
import PhFireSimpleBold from "../Icons/PhFireSimpleBold";
import PostMediaLayout from "./PostMediaLayout";
import InReplyTo from "./InReplyTo";
import { ProfilePicture } from "./ProfilePicture";
import UsernameRepost from "./UsernameRepost";
import PostContextMenu from "./PostContextMenu";
import { createContext } from "react";
import PostPin from "./PostPin";
import { useBreakpoint } from "../../Hooks/BreakpointHook";

export const PostContext = createContext<Post>({
  profileName: "",
  profileImage: undefined,
  postOwner: "",
  text: "",
  reactions: 0,
  tags: [],
  time: new Date(),
  media: [],
  reposter: undefined,
  replyingTo: undefined,
});

type PostProps = {
  profileName: string;
  profileImage?: string;
  postOwner: string;
  reposter?: string | undefined;
  replyingTo?: string | undefined;
  text: string;
  media: Array<Media>;
  reactions: number;
  tags: string[];
  time: Date;
  ownerOptions?: boolean;
  pinnedPost?: boolean;
};

function Post({
  profileName,
  profileImage,
  postOwner,
  text,
  reactions,
  tags,
  time,
  media,
  reposter,
  replyingTo,
  ownerOptions,
  pinnedPost,
}: PostProps) {
  const { isSm } = useBreakpoint("sm");
  return (
    <PostContext.Provider
      value={{
        profileName,
        profileImage,
        postOwner,
        text,
        reactions,
        tags,
        time,
        media,
        reposter,
        replyingTo,
      }}
    >
      <div className="relative">
        <div className="timeline-box flex flex-col overflow-hidden">
          {pinnedPost ? (
            <div className="-mx-3 mb-4 flex flex-row justify-end border-b border-black25 p-2 px-6 pb-1 dark:border-white25">
              <PostPin />
            </div>
          ) : null}

          {reposter ? (
            <div className="-mx-3 mb-4 flex flex-row justify-end border-b border-black25 px-6 pb-1 dark:border-white25">
              <UsernameRepost username={reposter} />
            </div>
          ) : null}

          <div className="flex flex-row-reverse flex-wrap items-center gap-4">
            <PostContextMenu class="self-start" ownerOptions={ownerOptions} />
            <p className="mr-3 self-start">{time.toLocaleString()}</p>
            <div className="mr-auto flex flex-row flex-wrap items-center gap-4">
              <div className="mx-auto">
                <ProfilePicture width={80} image={profileImage} />
              </div>
              <div className={"mx-auto flex flex-col"}>
                <h5>{profileName}</h5>
                <p className="text-black50">{postOwner}</p>
              </div>
            </div>
          </div>

          {replyingTo ? (
            <div>
              <InReplyTo username={replyingTo} />
            </div>
          ) : null}

          <div className={`flex flex-col gap-3 ${isSm ? "m-6" : "m-3"}`}>
            <div>{text}</div>

            {media.length > 0 && <PostMediaLayout media={media} />}

            <p className="flex flex-row flex-wrap gap-4">
              {tags.map((val, i) => (
                <a key={i}>{val}</a>
              ))}
            </p>
            <div className="mb-3 flex flex-row justify-center gap-4 text-2xl">
              <MaterialSymbolsFavoriteOutlineRounded />
              <MaterialSymbolsShareOutline />
              <MaterialSymbolsChatOutlineRounded />
              <MaterialSymbolsFlagRounded />
            </div>
          </div>
          <div className="-m-3 flex flex-row items-center justify-end gap-1 bg-black25 px-6 py-3 dark:bg-black75">
            <span className="text-lg">
              <PhFireSimpleBold />
            </span>
            <p>{reactions} Reactions</p>
          </div>
        </div>
      </div>
    </PostContext.Provider>
  );
}

export default Post;
