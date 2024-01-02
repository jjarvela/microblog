import MaterialSymbolsChatOutlineRounded from "../Icons/MaterialSymbolsChatOutlineRounded";
import MaterialSymbolsFavoriteOutlineRounded from "../Icons/MaterialSymbolsFavoriteOutlineRounded";
import MaterialSymbolsFlagRounded from "../Icons/MaterialSymbolsFlagRounded";
import MaterialSymbolsShareOutline from "../Icons/MaterialSymbolsShareOutline";
import PhFireSimpleBold from "../Icons/PhFireSimpleBold";
import { ProfilePicture } from "./ProfilePicture";
import UsernameRepost from "./UsernameRepost";

type PostProps = {
  profileName: string;
  profileImage?: string;
  username: string;
  text: string;
  reactions: number;
  tags: string[];
  time: Date;
};

function Post({
  profileName,
  profileImage,
  username,
  text,
  reactions,
  tags,
  time,
}: PostProps) {
  return (
    <div className="timeline-box flex flex-col overflow-clip">
      {/* Add conditional rendering for repost */}
      <div className="-mx-3 mb-4 flex flex-row justify-end border-b px-6 py-3">
        <UsernameRepost username={username} />
      </div>

      <div className="flex flex-row items-center gap-4">
        <ProfilePicture width={80} image={profileImage} />
        <h5>{profileName}</h5>
        <p className="text-black50">{username}</p>
        <p className="ml-auto mr-3 self-start">{time.toLocaleString()}</p>
      </div>
      <div className="m-6 flex flex-col gap-2">
        <div>{text}</div>
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
  );
}

export default Post;
