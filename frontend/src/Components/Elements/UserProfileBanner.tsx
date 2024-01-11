import { useContext } from "react";
import { UserContext } from "../UserPage";
import UserProfileInfo from "./UserProfileInfo";
import ProfileButton from "./ProfileButton";
import MaterialSymbolsAccountCircle from "../Icons/MaterialSymbolsAccountCircle";
import MaterialSymbolsArticleOutlineRounded from "../Icons/MaterialSymbolsArticleOutlineRounded";
import MaterialSymbolsImageOutlineRounded from "../Icons/MaterialSymbolsImageOutlineRounded";
import MaterialSymbolsFavoriteOutlineRounded from "../Icons/MaterialSymbolsFavoriteOutlineRounded";

type UserProfileBannerProps = {
  bannerImage?: string;
};

function UserProfileBanner({ bannerImage }: UserProfileBannerProps) {
  const user = useContext(UserContext);
  return (
    <div>
      <div className="relative h-60">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${bannerImage})`,
          }}
        />
        <UserProfileInfo
          profileHandle={user.userName}
          profileName={user.screenName}
          profileImageSize={150}
          class="absolute -bottom-5 left-[5%]"
        />
      </div>
      <div className="flex flex-row border-b border-black25 dark:border-white25">
        <div className="p-6 pt-10">
          <ul className="mb-4">
            <li>Location: {user.location}</li>
            <li>Joined: {user.joinDate?.toDateString()}</li>
            <li>Birthday: {user.birthDate?.toDateString()}</li>
          </ul>
          <div className="flex flex-row justify-around gap-6 text-secondary">
            <p className="text-[1.2rem] font-bold">
              Followers: {user.followers}
            </p>
            <p className="text-[1.2rem] font-bold">
              Following: {user.following}
            </p>
          </div>
        </div>
        <div className="flex-1 border-x border-black25 p-6 dark:border-white25">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            mollitia iusto id distinctio eaque repellat in sunt vero ea
            explicabo cum asperiores illum reprehenderit hic numquam tempora,
            molestias neque nobis.
          </p>
        </div>
        <div className="flex flex-col self-stretch">
          <ProfileButton to="profile">
            <MaterialSymbolsAccountCircle className="mr-1 text-lg" /> Profile
          </ProfileButton>
          <ProfileButton to="posts">
            <MaterialSymbolsArticleOutlineRounded className="mr-1 text-lg" />
            Posts
          </ProfileButton>
          <ProfileButton to="media">
            <MaterialSymbolsImageOutlineRounded className="mr-1 text-lg" />
            Media
          </ProfileButton>
          <ProfileButton to="likes">
            <MaterialSymbolsFavoriteOutlineRounded className="mr-1 text-lg" />
            Likes
          </ProfileButton>
        </div>
      </div>
    </div>
  );
}

export default UserProfileBanner;
