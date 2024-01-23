import { useNavigate } from "react-router";
import Button from "./Elements/Button";
import { useContext } from "react";
import { UserProfileContext } from "./UserPage";

function UserProfileEdit() {
  const user = useContext(UserProfileContext);
  const navigate = useNavigate();
  return (
    <div className="mx-4">
      <div className="my-1 flex flex-row flex-wrap items-center justify-center gap-4">
        <h3 className="my-4 text-center">
          Editing {user.screenName}'s Profile
        </h3>
        <Button onClick={() => navigate("..")} class="btn-secondary">
          Cancel
        </Button>
        <Button onClick={() => navigate("..")} class="btn-primary">
          Confirm Edits
        </Button>
      </div>
    </div>
  );
}

export default UserProfileEdit;
