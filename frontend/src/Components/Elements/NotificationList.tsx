import UserNotificationBox from "./UserNotificationBox";

export function NotificationList({
  notifications,
}: {
  notifications: ReactionFromServer[];
}) {
  return (
    <div className="flex flex-col-reverse">
      {notifications.map((notification: ReactionFromServer) => (
        <UserNotificationBox key={notification.id} reaction={notification} />
      ))}
    </div>
  );
}
