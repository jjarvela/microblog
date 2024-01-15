import { useRef } from "react";
import Button from "./Button";
import { ProfilePicture } from "./ProfilePicture";
import CatBanner from "/temp/cat-banner.jpg";
import GroupJoinRequest from "./GroupJoinRequest";

type GroupProfileBannerProps = {
  groupName?: string;
};

function GroupProfileBanner({ groupName }: GroupProfileBannerProps) {
  const joinRequest = useRef<HTMLDialogElement>(null);
  return (
    <div className="relative h-60 bg-cover bg-center">
      <img
        src={CatBanner}
        alt="Profile Banner"
        className="h-full w-full object-cover"
      />
      <div className="absolute -bottom-5 left-10 flex items-center gap-4 drop-shadow-md">
        <ProfilePicture width={150} />
        {groupName && <h1>{groupName}</h1>}
      </div>
      <div className="absolute right-7 top-7 flex gap-5 ">
        <Button class="btn-primary">Follow</Button>
        <Button
          onClick={() => joinRequest.current?.showModal()}
          class="btn-primary"
        >
          Request to Join
        </Button>
      </div>
      <GroupJoinRequest
        groupName="Kissat"
        groupAdmin="Erkki"
        refObject={joinRequest}
      />
    </div>
  );
}

export default GroupProfileBanner;
