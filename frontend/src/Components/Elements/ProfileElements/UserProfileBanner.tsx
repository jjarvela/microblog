import UserProfileInfo from "../UserProfileInfo";
import ProfileButton from "./ProfileButton";
import MaterialSymbolsAccountCircle from "../../Icons/MaterialSymbolsAccountCircle";
import MaterialSymbolsArticleOutlineRounded from "../../Icons/MaterialSymbolsArticleOutlineRounded";
import MaterialSymbolsImageOutlineRounded from "../../Icons/MaterialSymbolsImageOutlineRounded";
import MaterialSymbolsFavoriteOutlineRounded from "../../Icons/MaterialSymbolsFavoriteOutlineRounded";
import { useBreakpoint } from "../../../Hooks/BreakpointHook";
import Button from "../Button";
import { useContext } from "react";
import { ProfileContext } from "../../UserPage";

type UserProfileBannerProps = {
  bannerImage?: string;
};

function UserProfileBanner({ bannerImage }: UserProfileBannerProps) {
  const profile = useContext(ProfileContext);
  const { isSm } = useBreakpoint("sm");
  return (
    <div>
      <div className="relative h-80 sm:h-60">
        <div className="absolute left-0 top-0 h-full w-full">
          <div className="z-10 mx-4 mt-4 flex flex-row justify-between">
            <UserProfileInfo
              user={profile.details}
              profileImageSize={150}
              class=" text-white"
              nameClass="text-xl font-bold md:text-2xl"
              disablePopup={true}
            />
            <Button className="btn-primary h-[max-content]">Follow</Button>
          </div>
        </div>
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${bannerImage})`,
          }}
        />
      </div>
      <div className="flex flex-col border-black50 xl:flex-row">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-shrink border-b border-black25 p-6 pt-10 dark:border-white25">
            <ul className="mb-4">
              <li>Location: {profile.user?.location}</li>
              <li>
                Joined: {new Date(profile.user?.joined || "").toDateString()}
              </li>
              <li>
                Birthday:{" "}
                {new Date(profile.user?.birthday || "").toDateString()}
              </li>
            </ul>
            <div className="flex max-w-fit flex-shrink flex-row flex-wrap justify-around gap-6 whitespace-nowrap text-secondary">
              <p className="text-[1.2rem] font-bold">
                Followers: {profile.details?.followers?.length}
              </p>
              <p className="text-[1.2rem] font-bold">
                Following: {profile.details?.following?.length}
              </p>
            </div>
          </div>
          <div className="min-w-[50%] flex-1 border-b border-black25 p-6 dark:border-white25 lg:border-l xl:border-x">
            <p>{profile.profile?.profile_text}</p>
          </div>
        </div>
        <div className="flex w-full flex-row self-stretch border-black25 dark:border-white25 xl:w-auto xl:flex-shrink xl:flex-col xl:border-0">
          <ProfileButton
            to="profile"
            class="justify-center border-b border-r last:border-r-0 xl:justify-start xl:border-r-0"
          >
            <MaterialSymbolsAccountCircle className="mr-1 text-lg" />
            {isSm && "Profile"}
          </ProfileButton>
          <ProfileButton
            to="posts"
            class="justify-center border-b border-r last:border-r-0 xl:justify-start xl:border-r-0"
          >
            <MaterialSymbolsArticleOutlineRounded className="mr-1 text-lg" />
            {isSm && "Posts"}
          </ProfileButton>
          <ProfileButton
            to="media"
            class="justify-center border-b border-r last:border-r-0 xl:justify-start xl:border-r-0"
          >
            <MaterialSymbolsImageOutlineRounded className="mr-1 text-lg" />
            {isSm && "Media"}
          </ProfileButton>
          <ProfileButton
            to="likes"
            class="justify-center border-b border-r last:border-r-0 xl:justify-start xl:border-r-0"
          >
            <MaterialSymbolsFavoriteOutlineRounded className="mr-1 text-lg" />
            {isSm && "Likes"}
          </ProfileButton>
        </div>
      </div>
    </div>
  );
}

export default UserProfileBanner;
