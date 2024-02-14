import UserProfileInfo from "../UserProfileInfo";
import ProfileButton from "./ProfileButton";
import MaterialSymbolsAccountCircle from "../../Icons/MaterialSymbolsAccountCircle";
import MaterialSymbolsArticleOutlineRounded from "../../Icons/MaterialSymbolsArticleOutlineRounded";
import MaterialSymbolsImageOutlineRounded from "../../Icons/MaterialSymbolsImageOutlineRounded";
import MaterialSymbolsFavoriteOutlineRounded from "../../Icons/MaterialSymbolsFavoriteOutlineRounded";
import { useBreakpoint } from "../../../Hooks/BreakpointHook";
import Button from "../Button";
import { useContext } from "react";
import { ownerContext } from "../../UserPage";
import { useQuery } from "@tanstack/react-query";
import userService from "../../../Services/userService";

type UserProfileBannerProps = {
  bannerImage?: string;
};

function UserProfileBanner({ bannerImage }: UserProfileBannerProps) {
  const owner = useContext(ownerContext);
  console.log(owner);
  const { isSm } = useBreakpoint("sm");

  const ownerDetails = useQuery({
    queryKey: ["profileDetails", owner!.id],
    queryFn: async () => {
      const result = userService.getUser(owner!.id!);
      return result;
    },
  });

  return (
    <div>
      <div className="relative h-80 sm:h-60">
        <div className="absolute left-0 top-0 h-full w-full">
          <div className="z-10 mx-4 mt-4 flex flex-row justify-between">
            <UserProfileInfo
              user={owner}
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
              <li>
                Location: {ownerDetails.data && ownerDetails.data.location}
              </li>
              <li>
                Joined:{" "}
                {ownerDetails.data &&
                  new Date(Date.parse(ownerDetails.data.joined)).toDateString()}
              </li>
              <li>
                Birthday:{" "}
                {ownerDetails.data &&
                  new Date(
                    Date.parse(ownerDetails.data.birthday),
                  ).toDateString()}
              </li>
            </ul>
            <div className="flex max-w-fit flex-shrink flex-col flex-wrap justify-around gap-6 whitespace-nowrap text-secondary xl:flex-row">
              <p className="text-[1.2rem] font-bold">
                Followers: {owner?.followers?.length || 0}
              </p>
              <p className="text-[1.2rem] font-bold">
                Following: {owner?.following?.length || 0}
              </p>
            </div>
          </div>
          <div className="min-w-[50%] flex-1 border-b border-black25 p-6 dark:border-white25 lg:border-l xl:border-x">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
              mollitia iusto id distinctio eaque repellat in sunt vero ea
              explicabo cum asperiores illum reprehenderit hic numquam tempora,
              molestias neque nobis.
            </p>
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
