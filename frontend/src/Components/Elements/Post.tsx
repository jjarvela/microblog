import MaterialSymbolsChatOutlineRounded from "../Icons/MaterialSymbolsChatOutlineRounded";
import MaterialSymbolsFavoriteOutlineRounded from "../Icons/MaterialSymbolsFavoriteOutlineRounded";
import MaterialSymbolsFlagRounded from "../Icons/MaterialSymbolsFlagRounded";
import MaterialSymbolsShareOutline from "../Icons/MaterialSymbolsShareOutline";
import PhFireSimpleBold from "../Icons/PhFireSimpleBold";
import { ProfilePicture } from "./ProfilePicture";

type PostProps = {
  profileName: string;
  username: string;
};

function Post({ profileName, username }: PostProps) {
  return (
    <div className="timeline-box flex flex-col overflow-clip border-black50">
      <div className="flex flex-row items-center gap-4">
        <ProfilePicture width={80} />
        <h5>{profileName}</h5>
        <p className="text-black50">{username}</p>
        <p className="ml-auto mr-3 self-start">2023-12-20 14:42 GMT+2</p>
      </div>
      <div className="m-6 flex flex-col gap-2">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          possimus mollitia impedit ut ipsum repellat dolor quae, provident odit
          aliquid? Sed magni suscipit, voluptate quo modi odit consectetur velit
          a?
        </div>
        <p className="flex flex-row gap-4">
          <a>#hashtag</a>
          <a>#longerhashtag</a>
          <a>#tag</a>
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
        <p>42 Reactions</p>
      </div>
    </div>
  );
}

export default Post;
