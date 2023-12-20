import Post from "./Elements/Post";

const UserTimeline = () => {
  return (
    <>
      <h2 className="my-4 text-center">Timeline</h2>
      <Post profileName="Test User ✨" username="@testuser" />
    </>
  );
};

export default UserTimeline;
