import Button from "./Button";
import { ProfilePicture } from "./ProfilePicture";

type GroupThumbnailProps = {
  groupName: string;
  groupAdmin: string;
  groupDescription: string;
  members: number;
  activity: string;
  rule: string;
};

function GroupThumbnail({
  groupName,
  groupAdmin,
  groupDescription,
  members,
  activity,
  rule,
}: GroupThumbnailProps) {
  return (
    <div className="thumbnail my-1">
      <div className="flex justify-start">
        <ProfilePicture width={80} />
        <div className="flex-grow">
          <div className="flex justify-between">
            <div className="flex-grow px-3">
              <h4 className="me-3 dark:text-white">{groupName}</h4>
              <p>Admin: {groupAdmin}</p>
              <p className="me-3 font-semibold text-secondary">
                Members: {members}
              </p>
            </div>
            <div className="flex content-start justify-end">
              <div className="me-2">
                <p>
                  <small>
                    Recent activity:{" "}
                    <span className="text-black50 dark:text-white75">
                      {activity}
                    </span>
                  </small>
                </p>
                <p>
                  <small>
                    Join rules:{" "}
                    <span className="text-black50 dark:text-white75">
                      {rule}
                    </span>
                  </small>
                </p>
              </div>
            </div>
          </div>
          <div className="mx-4">
            <p className="text-black75 dark:text-white">{groupDescription}</p>
          </div>
          <div className="flex content-start justify-end">
            <Button class="btn-primary">
              <small>Follow</small>
            </Button>
            <Button class="btn-primary">
              <small>Join</small>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupThumbnail;
