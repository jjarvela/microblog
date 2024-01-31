import { useContext, useState } from "react";
import { UserProfileContext } from "./UserPage";
import Button from "./Elements/Button";
import ProfileBoxes from "./Elements/ProfileElements/ProfileBoxes/ProfileBoxes";

function UserProfile() {
  const user = useContext(UserProfileContext);
  const [isEditing, setIsEditing] = useState(false);
  const [boxes, setBoxes] = useState(user.userProfileBoxes);
  const owned = true; // Implement later to check if logged in user is the profile owner
  return (
    <div className="mx-4">
      <div className="flex flex-row items-center justify-center gap-4">
        {isEditing ? (
          <h3 className="my-[1.31rem] text-center">
            Editing {user.screenName}'s Profile
          </h3>
        ) : (
          <h2 className="my-4 text-center">{user.screenName}'s Profile</h2>
        )}
        {owned && !isEditing && (
          <Button onClick={() => setIsEditing(true)} className="btn-primary">
            Edit
          </Button>
        )}
        {isEditing && (
          <>
            <Button
              onClick={() => setIsEditing(false)}
              className="btn-secondary"
            >
              Cancel
            </Button>
            <Button onClick={() => setIsEditing(false)} className="btn-primary">
              Confirm Edits
            </Button>
          </>
        )}
      </div>
      <ProfileBoxes boxes={boxes} editing={isEditing} setBoxes={setBoxes} />
    </div>
  );
}

export default UserProfile;
