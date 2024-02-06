import { useRef } from "react";
import Button from "../Button";
import { ProfilePicture } from "../ProfilePicture";
import GroupJoinRequest from "../Modals/GroupJoinRequest";
import { useNavigate } from "react-router";

type GroupThumbnailProps = {
  group: Group;
};

function GroupThumbnail({ group }: GroupThumbnailProps) {
  const navigate = useNavigate();
  const joinRequest = useRef<HTMLDialogElement>(null);
  function handleJoinClick() {
    navigate(`/groups/profile/${group.groupName}`, { state: { group } });
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
                      {group.joinRule === "everyone" && "All accepted"}
                      {group.joinRule === "permission" && "Request permission"}
                      {group.joinRule === "closed" && "Closed"}
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
            <Button className="btn-primary">
              <small>Follow</small>
            </Button>
            {group.joinRule === "everyone" && (
              <Button className="btn-primary" onClick={handleJoinClick}>
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
        </div>
      </div>
      <GroupJoinRequest
        groupName={group.groupName}
        groupAdmin={group.groupAdmin.screenName}
        refObject={joinRequest}
      />
    </div>
  );
}

export default GroupThumbnail;
