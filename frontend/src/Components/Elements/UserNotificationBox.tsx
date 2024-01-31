import { ProfilePicture } from "../Elements/ProfilePicture";

type UserNotificationBoxProps = {
  userName: string;
  groupName: string;
  text: string;
  notifications: string[];
  notificationId: string;
  removeNotification: (id: string) => void;
  createdAt: string;
  title: string;
};

const UserNotificationBox = ({
  title,
  notifications,
  text,
  notificationId,
  removeNotification,
  createdAt,
}: UserNotificationBoxProps) => {
  const handleCloseToast = () => {
    removeNotification(notificationId);
  };
  const getElapsedTime = (timestamp: string | number) => {
    const now = new Date().getTime();
    const elapsedTime = now - timestamp;
    const minutes = Math.floor(elapsedTime / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  const renderNotifications = () => {
    const elapsed = getElapsedTime(createdAt);
    if (notifications.length >= 3) {
      return (
        <div className="relative z-30 mb-5 h-40 w-11/12 rounded-md border border-primary bg-gradient-to-r from-white to-black25 drop-shadow-lg dark:from-black75 dark:to-black">
          <div className="absolute -bottom-3 z-20 h-40 w-full rounded-md border border-primary bg-gradient-to-r from-white to-black25 drop-shadow-lg  dark:from-black75 dark:to-black"></div>
          <div className="absolute -bottom-6 z-40 flex h-40 w-full flex-row rounded-md border border-primary bg-gradient-to-r from-white to-black25 p-3 drop-shadow-lg  dark:from-black75 dark:to-black">
            <div className="ms-1 flex flex-col gap-9">
              <ProfilePicture width={70} />
              <p>
                <small>{notifications.length - 1}+ notifications</small>
              </p>
            </div>
            <div className="flex basis-7/12 flex-col">
              <h5>{title}</h5>
              <p>{text}</p>
            </div>
            <div className="absolute right-2 top-1 m-1 flex flex-col">
              <button onClick={handleCloseToast}>X</button>
            </div>
            <div className="absolute bottom-2 right-2 m-2 flex flex-col">
              <small>{elapsed}</small>
            </div>
          </div>
        </div>
      );
    } else if (notifications.length === 2) {
      return (
        <div className="relative mb-3 h-40 w-11/12 rounded-md border border-primary bg-gradient-to-r from-white to-black25 drop-shadow-lg dark:from-black75 dark:to-black">
          <div className="absolute -bottom-3 flex h-40 w-full rounded-md border border-primary bg-gradient-to-r from-white to-black25 p-3  drop-shadow-lg dark:from-black75 dark:to-black">
            <div className="ms-1 flex flex-col gap-9">
              <ProfilePicture width={70} />
              <p>
                <small>{notifications.length - 1}+ notifications</small>
              </p>
            </div>
            <div className="flex basis-7/12 flex-col">
              <h5>{title}</h5>
              <p>{text}</p>
            </div>
            <div className="absolute right-2 top-1 m-1 flex flex-col">
              <button onClick={handleCloseToast}>X</button>
            </div>
            <div className="absolute bottom-2 right-2 m-2 flex flex-col">
              <small>{elapsed}</small>
            </div>
          </div>
        </div>
      );
    } else if (notifications.length === 1) {
      return (
        <div className="relative flex h-40 w-11/12 flex-row rounded-md border border-primary bg-gradient-to-r from-white to-black25 p-3 drop-shadow-lg dark:from-black75 dark:to-black">
          <div className="me-5 flex flex-col gap-9">
            <ProfilePicture width={70} />
          </div>
          <div className="flex basis-7/12 flex-col">
            <h5>{title}</h5>
            <p>{text}</p>
          </div>
          <div className="absolute right-2 top-1 m-1 flex flex-col">
            <button onClick={handleCloseToast}>X</button>
          </div>
          <div className="absolute bottom-2 right-2 m-2 flex flex-col">
            <small>{elapsed}</small>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="my-10 flex flex-col items-center">
      {renderNotifications()}
    </div>
  );
};

export default UserNotificationBox;
