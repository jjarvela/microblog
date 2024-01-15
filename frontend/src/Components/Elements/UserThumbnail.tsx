import { MdiDotsHorizontal } from "../Icons/MdiThreeDots";
import Button from "./Button";
import { ProfilePicture } from "./ProfilePicture";

type UserThumbnailProps = {
  profileName: string;
  username: string;
  userDescription: string;
  followers: number;
  following: number;
};

function UserThumbnail({
  profileName,
  username,
  userDescription,
  followers,
  following,
}: UserThumbnailProps) {
  return (
    <div className="timeline-box">
      <div className="flex justify-start gap-4">
        <ProfilePicture width={80} />
        <div className="flex-grow">
          <div className="flex justify-between">
            <div>
              <div className="flex h-fit flex-grow flex-col justify-start px-3">
                <h5 className="me-3 dark:text-white">{profileName}</h5>
                <p className="mb-2 text-black50">{username}</p>
              </div>
              <div className="flex h-fit flex-grow justify-start px-4">
                <small className="me-3 font-semibold text-secondary">
                  {followers} Followers
                </small>
                <small className="font-semibold text-black50">
                  {following} Following
                </small>
              </div>
            </div>
            <div className="flex h-fit flex-col justify-end gap-4 self-center lg:flex-row">
              <Button class="btn-primary">
                <small>Follow</small>
              </Button>
              <Button class="btn-primary w-fit self-center py-3 lg:px-3 lg:py-3">
                <p>
                  <MdiDotsHorizontal />
                </p>
              </Button>
            </div>
          </div>
          <div className="mx-4">
            <p className="text-black75 dark:text-white">{userDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserThumbnail;
