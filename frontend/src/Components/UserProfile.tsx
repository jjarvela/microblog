import ProfileBoxes, {
  ProfileBox,
} from "./Elements/ProfileElements/ProfileBoxes/ProfileBoxes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { testUserId } from "../globalData";
import profileService from "../Services/profileService";

function UserProfile() {
  const owned = true; // Implement later to check if logged in user is the profile owner

  const queryClient = useQueryClient();

  const boxesQuery = useQuery({
    queryKey: ["boxes", testUserId],
    queryFn: () => profileService.getProfileElements(testUserId),
  });

  const mutateBoxes = useMutation({
    mutationFn: (boxes: ProfileBox[]) =>
      profileService.editProfileElements(testUserId, boxes),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes", testUserId] });
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
      />
    </div>
  );
}

export default UserProfile;
