import Button from "./Button";
import { ProfilePicture } from "./ProfilePicture";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  function handleJoinClick() {
    navigate(`/groups/${groupName}`, { state: { groupName } });
  }

  return (
    <div className="timeline-box">
      <div className="flex justify-start gap-4">
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
          <div className="flex content-start justify-end gap-4">
            <Button class="btn-primary">
              <small>Follow</small>
            </Button>
            <Button class="btn-primary" onClick={handleJoinClick}>
              <small>Join</small>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupThumbnail;
