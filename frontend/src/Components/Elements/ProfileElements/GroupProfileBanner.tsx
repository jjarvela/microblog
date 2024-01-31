import { useRef } from "react";
import Button from "../Button";
import { ProfilePicture } from "../ProfilePicture";
import CatBanner from "/temp/cat-banner.jpg";
import GroupJoinRequest from "../Modals/GroupJoinRequest";

type GroupProfileBannerProps = {
  group: Group;
};

function GroupProfileBanner({ group }: GroupProfileBannerProps) {
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
        {<h1>{group.groupName}</h1>}
      </div>
      <div className="absolute right-7 top-7 flex gap-5 ">
        <Button className="btn-primary">
          <small>Follow</small>
        </Button>
        {group.joinRule === "everyone" && (
          <Button className="btn-primary">
            <small>Join</small>
          </Button>
        )}
        {group.joinRule === "permission" && (
          <Button
            className="btn-primary"
            onClick={() => joinRequest.current?.showModal()}
          >
            <small>Request to Join</small>
          </Button>
        )}
        {group.joinRule === "closed" && (
          <Button className="btn-primary" disabled>
            <small>Join</small>
          </Button>
        )}
      </div>
      <GroupJoinRequest
        groupName={group.groupName}
        groupAdmin={group.groupAdmin.screenName}
        refObject={joinRequest}
      />
    </div>
  );
}

export default GroupProfileBanner;
