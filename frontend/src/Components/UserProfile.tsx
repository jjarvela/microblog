import ProfileBoxes, {
  ProfileBox,
} from "./Elements/ProfileElements/ProfileBoxes/ProfileBoxes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import profileService from "../Services/profileService";
import { useContext } from "react";
import { ProfileContext } from "./UserPage";
import { useUser } from "../UserWrapper";

function UserProfile() {
  const queryClient = useQueryClient();
  const profile = useContext(ProfileContext);
  const user = useUser();
  const owned = profile.userId === user.user?.id;

  const boxesQuery = useQuery({
    queryKey: ["boxes", profile.userId],
    queryFn: () => profileService.getProfileElements(profile.userId || ""),
    enabled: !!profile.userId,
  });

  const mutateBoxes = useMutation({
    mutationFn: (boxes: ProfileBox[]) =>
      profileService.editProfileElements(profile.userId || "", boxes),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes", profile.userId] });
    },
  });

  if (boxesQuery.isLoading) {
    return (
      <div className="mx-4">
        <h4 className="my-4 text-center">Loading profile elements...</h4>
      </div>
    );
  }

  if (boxesQuery.isError) {
    return (
      <div className="mx-4">
        <h4 className="my-4 text-center text-warning dark:text-warningDark">
          Error getting profile elements!
        </h4>
      </div>
    );
  }

  return (
    <div className="mx-4">
      <ProfileBoxes
        boxes={boxesQuery.data as ProfileBox[]}
        setBoxes={(boxes) => mutateBoxes.mutate(boxes)}
        owned={owned}
        onEditCancel={() => {
          queryClient.invalidateQueries({
            queryKey: ["boxes", profile.userId],
          });
          console.log("Cancelled");
        }}
      />
    </div>
  );
}

export default UserProfile;
