import MaterialSymbolsChatOutlineRounded from "../Icons/MaterialSymbolsChatOutlineRounded";
import MaterialSymbolsFavoriteOutlineRounded from "../Icons/MaterialSymbolsFavoriteOutlineRounded";
import MaterialSymbolsFlagRounded from "../Icons/MaterialSymbolsFlagRounded";
import MaterialSymbolsShareOutline from "../Icons/MaterialSymbolsShareOutline";
import PhFireSimpleBold from "../Icons/PhFireSimpleBold";
import PostMediaLayout from "./PostMediaLayout";
import InReplyTo from "./InReplyTo";
import { ProfilePicture } from "./ProfilePicture";
import UsernameRepost from "./UsernameRepost";
import { createContext } from "react";

export const PostContext = createContext<Post>({
  profileName: "",
  profileImage: undefined,
  postOwner: "",
  text: "",
  reactions: 0,
  tags: [],
  time: new Date(),
  media: undefined,
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
  media?: Array<Media> | undefined;
  reactions: number;
  tags: string[];
  time: Date;
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
}: PostProps) {
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
      <div className="timeline-box flex flex-col overflow-clip">
        {reposter ? (
          <div className="-mx-3 mb-4 flex flex-row justify-end border-b border-black25 px-6 pb-1 dark:border-white25">
            <UsernameRepost username={reposter} />
          </div>
        ) : null}

        <div className="flex flex-row items-center gap-4">
          <ProfilePicture width={80} image={profileImage} />
          <h5>{profileName}</h5>
          <p className="text-black50">{postOwner}</p>
          <p className="ml-auto mr-3 self-start">{time.toLocaleString()}</p>
        </div>

        {replyingTo ? (
          <div>
            <InReplyTo username={replyingTo} />
          </div>
        ) : null}

        <div className="m-6 flex flex-col gap-2">
          <div>{text}</div>

          {media ? <PostMediaLayout media={media} /> : null}

          <p className="flex flex-row gap-4">
            {tags.map((val, i) => (
              <a key={i}>{val}</a>
            ))}
          </p>
          <div className="flex flex-row justify-center gap-4 text-2xl">
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
    </PostContext.Provider>
  );
}

export default Post;
