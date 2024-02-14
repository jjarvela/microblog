import UserProfileBanner from "./Elements/ProfileElements/UserProfileBanner";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import UserProfile from "./UserProfile";
import UserPosts from "./UserPosts";
import UserMedia from "./UserMedia";
import UserLikes from "./UserLikes";

function UserPage() {
  return (
    <div>
      <UserProfileBanner bannerImage="https://images.pexels.com/photos/38326/pexels-photo-38326.jpeg" />
      <Routes>
        <Route index element={<Navigate to={"profile"} />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="posts" element={<UserPosts />} />
        <Route path="media" element={<UserMedia />} />
        <Route path="likes" element={<UserLikes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default UserPage;
