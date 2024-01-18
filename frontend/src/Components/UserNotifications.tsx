import UserNotificationBox from "./Elements/UserNotificationBox";

const UserNotifications = () => {
  return (
    <div>
      <h2 className="m-3 text-center">This is the user's notifications hub</h2>
      <div>
        <UserNotificationBox
          notifications={["noti1"]}
          groupName={"BuuttiBois"}
          userName={""}
          text={""}
        />
        <UserNotificationBox
          notifications={["noti1", "noti2"]}
          userName="Mutsis"
          groupName={""}
          text={""}
        />
        <UserNotificationBox
          notifications={["noti1", "noti2", "noti3"]}
          userName="dickerson99"
          groupName={""}
          text={""}
        />
      </div>
    </div>
  );
};

export default UserNotifications;
