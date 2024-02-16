//import { TypeOptions, toast } from "react-toastify";
import UserNotificationBox from "./Elements/UserNotificationBox";
//import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUser } from "../UserWrapper";
import notificationService from "../Services/notificationService";
import { queryClient } from "../main";

/*const types = ["success", "info", "warning", "error"];*/

const UserNotifications = () => {
  const user = useUser().user;
  /*interface Data {
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
      className: "timeline-box dark:text-gray-100 dark:bg-gray-500",
      data: {
        title: "GroupName or UserName",
      },
    });
  };*/

  const notificationQuery = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: () => {
      if (user)
        return notificationService.getUserNotifications({
          userId: user.id,
        });
      else return [];
    },
    enabled: !!user,
  });

  const markReadMutation = useMutation({
    mutationKey: ["mark-read-mutation", user?.id],
    mutationFn: async (notifications: ReactionFromServer[]) => {
      const target = notifications.map((item) => item.id);
      await notificationService.handleNotificationReadStatus(
        user!.id,
        target,
        "true",
      );
      return "success";
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["unread-notifications", "notifications", user?.id],
      });
    },
  });

  useEffect(() => {
    notificationQuery.data &&
      console.log(
        notificationQuery.data.filter(
          (item: ReactionFromServer) => item.read === false,
        ),
      );
    if (
      notificationQuery.isSuccess &&
      notificationQuery.data.length > 0 &&
      notificationQuery.data.filter(
        (item: ReactionFromServer) => item.read === false,
      ).length > 0
    ) {
      setTimeout(() => {
        const target: ReactionFromServer[] = notificationQuery.data.filter(
          (item: ReactionFromServer) => item.read === false,
        );
        markReadMutation.mutate(target);
      }, 4000);
    }
  }, [notificationQuery.data]);

  return (
    <div className="flex flex-col">
      <h2 className="my-4 text-center">Notifications Hub</h2>
      <div className="flex flex-col">
        <ul>
          {notificationQuery.data &&
            notificationQuery.data.length > 0 &&
            notificationQuery.data.map((notification: ReactionFromServer) => (
              <li key={notification.id}>
                <UserNotificationBox reaction={notification} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UserNotifications;
