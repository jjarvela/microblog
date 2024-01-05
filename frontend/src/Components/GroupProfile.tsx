import GroupProfileBanner from "./Elements/GroupProfileBanner";

const GroupProfile = () => {
  return (
    <div className="flex flex-col">
      <GroupProfileBanner />
      <h2 className="text-center">This is the profile of a group</h2>
    </div>
  );
};

export default GroupProfile;
