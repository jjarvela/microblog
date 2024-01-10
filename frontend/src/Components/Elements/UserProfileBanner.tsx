import { useContext } from "react";
import { UserContext } from "../UserProfile";
import UserProfileInfo from "./UserProfileInfo";

function UserProfileBanner() {
  const user = useContext(UserContext);
  return (
    <div className="relative h-60 bg-[#000]">
      <UserProfileInfo
        profileHandle={user.userName}
        profileName={user.screenName}
        profileImageSize={150}
        class="absolute -bottom-5 left-[5%]"
      />
    </div>
  );
}

export default UserProfileBanner;
