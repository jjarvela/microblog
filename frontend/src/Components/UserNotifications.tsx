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
          text={"Jarkon Porkkanakakkukatastrofi"}
        />
        <UserNotificationBox
          notifications={["noti1", "noti2"]}
          userName="Mutsis"
          groupName={""}
          text={"Simaresepti"}
        />
        <UserNotificationBox
          notifications={[
            "noti1",
            "noti2",
            "noti3",
            "noti",
            "noti",
            "noti",
            "noti",
            "noti",
            "noti",
            "noti",
            "noti",
            "noti",
          ]}
          userName="dickerson99"
          groupName={""}
          text={"I really like you. Please reply to my messages!!!1"}
        />
      </div>
    </div>
  );
};

export default UserNotifications;
