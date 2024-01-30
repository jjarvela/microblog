import { TypeOptions, toast } from "react-toastify";
import UserNotificationBox from "./Elements/UserNotificationBox";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import { Key, ReactNode } from "react";

const types = ["success", "info", "warning", "error"];

const UserNotifications = () => {
  interface Data {
    id: Key | null | undefined;
    createdAt: ReactNode;
    content: ReactNode;
    title: string;
    text: string;
    exclude: boolean;
  }
  const { notifications, clear, markAsRead, remove } =
    useNotificationCenter<Data>({});

  const addNotification = () => {
    // use a random type of notification
    toast("Lorem ipsum dolor sit amet, consectetur adipiscing elit", {
      type: types[Math.floor(Math.random() * types.length)] as TypeOptions,
    });
  };

  return (
    <div>
      <h2 className="my-4 text-center">Notifications Hub</h2>
      <div>
        <button className="btn-primary" onClick={addNotification}>
          Show notification
        </button>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              <UserNotificationBox
                notifications={notifications}
                groupName={notifications.groupName}
                userName={notification.userName}
                text={notification.content}
                notificationId={notification.id}
                removeNotification={remove}
              />
            </li>
          ))}
        </ul>
      </div>
      <button className="btn-primary" onClick={clear}>
        Clear All
      </button>
    </div>
  );
};

export default UserNotifications;
