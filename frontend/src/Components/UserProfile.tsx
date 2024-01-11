import { useContext } from "react";
import FeaturedMediaPost from "./Elements/FeaturedMediaPost";
import LinksBox from "./Elements/LinksBox";
import LogosFacebook from "./Icons/LogosFacebook";
import LogosGithubIcon from "./Icons/LogosGithubIcon";
import LogosTwitter from "./Icons/LogosTwitter";
import LogosYoutubeIcon from "./Icons/LogosYoutubeIcon";
import { UserContext } from "./UserPage";

function UserProfile() {
  const user = useContext(UserContext);
  return (
    <div className="m-4">
      <h2 className="my-4 text-center">{user.screenName}'s Profile</h2>
      <div className="flex flex-row flex-wrap gap-4">
        <div className="min-w-[75%] flex-1">
          <FeaturedMediaPost
            postOwner={user.featuredPost?.postOwner || ""}
            profileName={user.featuredPost?.profileName || ""}
            media={user.featuredPost?.media}
            tags={user.featuredPost?.tags || []}
            time={user.featuredPost?.time || new Date()}
            text={user.featuredPost?.text}
            reactions={user.featuredPost?.reactions}
            class="mx-0"
          />
        </div>
        <LinksBox
          links={[
            { icon: <LogosTwitter />, text: "Twitter" },
            { icon: <LogosYoutubeIcon />, text: "YouTube" },
            { icon: <LogosFacebook />, text: "Facebook" },
            { icon: <LogosGithubIcon />, text: "GitHub" },
          ]}
          class="h-max flex-grow"
        />
      </div>
    </div>
  );
}

export default UserProfile;
