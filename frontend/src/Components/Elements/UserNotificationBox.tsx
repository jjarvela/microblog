import { ProfilePicture } from "../Elements/ProfilePicture";

type UserNotificationBoxProps = {
  userName: string;
  groupName: string;
  text: string;
  notifications: string[];
};

const UserNotificationBox = ({
  userName,
  groupName,
  notifications,
  text,
}: UserNotificationBoxProps) => {
  const renderNotifications = () => {
    if (notifications.length >= 3) {
      return (
        <div className="relative z-30 mb-5 h-40 w-5/6 rounded-md border border-primary bg-gradient-to-r from-white to-black25 drop-shadow-lg dark:from-black75 dark:to-black">
          <div className="absolute -bottom-3 z-20 h-40 w-full rounded-md border border-orange-500 bg-gradient-to-r from-gray-200 to-gray-300 drop-shadow-lg  dark:from-gray-500 dark:to-gray-700"></div>
          <div className="absolute -bottom-6 z-40 flex h-40 w-full rounded-md border border-orange-500 bg-gradient-to-r from-gray-200 to-gray-300 p-3 drop-shadow-lg  dark:from-gray-500 dark:to-gray-700">
            <div className="mx-3 flex flex-col gap-3">
              <ProfilePicture width={70} />
            </div>
            <div className="flex flex-col">
              <h5>{userName}</h5>
              <p>{text}</p>
              <p className="mt-8">
                {notifications.length - 1} more notifications
              </p>
            </div>
          </div>
        </div>
      );
    } else if (notifications.length === 2) {
      return (
        <div className="relative mb-3 h-40 w-5/6 rounded-md border border-orange-500 bg-gradient-to-r from-gray-200 to-gray-300  drop-shadow-lg dark:from-gray-500 dark:to-gray-700">
          <div className="absolute -bottom-3 flex h-40 w-full rounded-md border border-orange-500 bg-gradient-to-r from-gray-200 to-gray-300 p-3  drop-shadow-lg dark:from-gray-500 dark:to-gray-700">
            <div className="mx-3 flex flex-col gap-3">
              <ProfilePicture width={70} />
            </div>
            <div className="flex flex-col">
              <h5>{userName}</h5>
              <p>{text}</p>
              <p className="mt-8">
                {notifications.length - 1} more notification
              </p>
            </div>
          </div>
        </div>
      );
    } else if (notifications.length === 1) {
      return (
        <div className="relative flex h-40 w-5/6 flex-row rounded-md border border-orange-500 bg-gradient-to-r from-gray-200 to-gray-300 p-3 drop-shadow-lg dark:from-gray-500 dark:to-gray-700">
          <div className="mx-3 flex flex-col gap-3">
            <ProfilePicture width={70} />
          </div>
          <div className="flex flex-col">
            <h5>{groupName}</h5>
            <p>{text}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="my-6 flex flex-col items-center gap-10">
      {renderNotifications()}
    </div>
  );
};

export default UserNotificationBox;
