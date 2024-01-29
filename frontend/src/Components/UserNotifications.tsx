import { TypeOptions, toast } from "react-toastify";
import UserNotificationBox from "./Elements/UserNotificationBox";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import { Key, ReactNode } from "react";

const types = ["success", "info", "warning", "error"];

interface Data {
  id: Key | null | undefined;
  createdAt: ReactNode;
  content: ReactNode;
  title: string;
  text: string;
  exclude: boolean;
}

toast("Hello", {
  data: {
    title: "Hello",
    text: "Lorem ipsum dolor...",
  },
});

const UserNotifications = () => {
  const addNotification = () => {
    // use a random type of notification
    toast("Lorem ipsum dolor sit amet, consectetur adipiscing elit", {
      type: types[Math.floor(Math.random() * types.length)] as TypeOptions,
    });
  };
  const { notifications, clear } = useNotificationCenter<Data>({
    data: [
      {
        id: "anId",
        createdAt: Date.now(),
        data: { exclude: false },
        notifications: ["noti1"],
        content: "jammajeee",
        groupName: "BuuttiPois",
        userName: "",
        text: "Jarkon porkkanakakkukatastrofi",
      },
      {
        id: "anotherId",
        createdAt: Date.now(),
        data: { exclude: false },
        notifications: ["noti1", "noti2"],
        userName: "Mutsis",
        groupName: "",
        text: "Simaresepti",
      },
      {
        id: "Kolmas",
        createdAt: Date.now(),
        data: { exclude: false },
        notifications: ["noti1", "noti2", "noti3"],
        userName: "Dickerson",
        groupName: "",
        text: "<3<3<3",
      },
    ],
    sort: (l, r) => l.createdAt - r.createdAt,
    filter: (item) => item.data.exclude === false,
  });

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
                notifications={notification.notifications}
                groupName={notification.groupName}
                userName={notification.userName}
                text={notification.text}
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
