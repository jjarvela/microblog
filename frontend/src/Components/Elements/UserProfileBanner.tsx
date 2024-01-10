import { useContext } from "react";
import { UserContext } from "../UserProfile";
import UserProfileInfo from "./UserProfileInfo";
import Button from "./Button";

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
        <div className="px-6 py-10">
          <ul>
            <li>Location: {user.location}</li>
            <li>Joined: {user.joinDate?.toDateString()}</li>
            <li>Birthday: {user.birthDate?.toDateString()}</li>
          </ul>
        </div>
        <div className="flex-1 border-x border-black25 px-6 py-10 dark:border-white25">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
            mollitia iusto id distinctio eaque repellat in sunt vero ea
            explicabo cum asperiores illum reprehenderit hic numquam tempora,
            molestias neque nobis.
          </p>
        </div>
        <div className="self-end">
          <Button class="btn-primary rounded-none">Profile</Button>
          <Button class="btn-primary rounded-none">Posts</Button>
          <Button class="btn-primary rounded-none">Media</Button>
          <Button class="btn-primary rounded-none">Likes</Button>
        </div>
      </div>
    </div>
  );
}

export default UserProfileBanner;
