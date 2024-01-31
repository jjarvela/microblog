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
  const { notifications, clear, remove } = useNotificationCenter<Data>({});

  const addNotification = () => {
    // use a random type of notification
    toast("Lorem ipsum dolor sit amet, consectetur adipiscing elit", {
      type: types[Math.floor(Math.random() * types.length)] as TypeOptions,
      data: {
        title: "GroupName or UserName",
      },
    });
  };

  return (
    <div className="flex flex-col">
      <h2 className="my-4 text-center">Notifications Hub</h2>
      <div className="flex flex-col">
        <div className="flex justify-end">
          <button className="btn-primary mx-3" onClick={addNotification}>
            Show notification
          </button>
          <button className="btn-primary mx-5 " onClick={clear}>
            Clear All
          </button>
        </div>

        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              <UserNotificationBox
                notifications={notifications}
                title={notification.data.title}
                text={notification.content}
                notificationId={notification.id}
                removeNotification={remove}
                createdAt={notification.createdAt}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserNotifications;
