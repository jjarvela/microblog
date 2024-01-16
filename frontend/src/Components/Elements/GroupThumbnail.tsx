import Button from "./Button";
import { ProfilePicture } from "./ProfilePicture";
import { useNavigate } from "react-router";

type GroupThumbnailProps = {
  group: Group;
};

function GroupThumbnail({ group }: GroupThumbnailProps) {
  const navigate = useNavigate();

  function handleJoinClick() {
    navigate(`/groups/${group.groupName}`, { state: group.groupName });
  }

  return (
    <div className="timeline-box">
      <div className="flex justify-start gap-4">
        <ProfilePicture width={80} />
        <div className="flex-grow">
          <div className="flex justify-between">
            <div className="flex-grow px-3">
              <h4 className="me-3 dark:text-white">{group.groupName}</h4>
              <p>Admin: {group.groupAdmin.userName}</p>
              <p className="me-3 font-semibold text-secondary">
                Members: {group.groupMembers}
              </p>
            </div>
            <div className="flex content-start justify-end">
              <div className="me-2">
                <p>
                  <small>
                    Recent activity:{" "}
                    <span className="text-black50 dark:text-white75">
                      {group.recentActivity instanceof Date ? (
                        <time>{group.recentActivity.toLocaleString()}</time>
                      ) : (
                        group.recentActivity
                      )}
                    </span>
                  </small>
                </p>
                <p>
                  <small>
                    Join rules:{" "}
                    <span className="text-black50 dark:text-white75">
                      {group.joinRule}
                    </span>
                  </small>
                </p>
              </div>
            </div>
          </div>
          <div className="mx-4">
            <p className="text-black75 dark:text-white">
              {group.groupDescription}
            </p>
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
