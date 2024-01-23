import { useContext } from "react";
import { UserProfileContext } from "./UserPage";
import { useNavigate } from "react-router";
import Button from "./Elements/Button";
import ProfileBoxes from "./Elements/ProfileElements/ProfileBoxes/ProfileBoxes";

function UserProfile() {
  const user = useContext(UserProfileContext);
  const owned = true; // Implement later to check if logged in user is the profile owner
  const navigate = useNavigate();
  return (
    <div className="mx-4">
      <div className="flex flex-row items-center justify-center gap-4">
        <h2 className="my-4 text-center">{user.screenName}'s Profile</h2>
        {owned && (
          <Button onClick={() => navigate("edit")} class="btn-primary">
            Edit
          </Button>
        )}
      </div>
      <ProfileBoxes boxes={user.userProfileBoxes} />
    </div>
  );
}

export default UserProfile;
