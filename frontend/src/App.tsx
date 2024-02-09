import { Routes, Route, Outlet } from "react-router-dom";
import UserTimeline from "./Components/UserTimeline";
import UserPage from "./Components/UserPage";
import UserSettings from "./Components/UserSettings";
import UserNotifications from "./Components/UserNotifications";
import UserMessages from "./Components/UserMessages";
import UserFollowing from "./Components/UserFollowing";
import GroupList from "./Components/GroupList";
import GroupProfile from "./Components/GroupProfile";
import Landing from "./Components/Landing";
import Search from "./Components/Search";
import Header from "./Components/Header";
import LeftSidebar from "./Components/LeftSidebar";
import RightSidebar from "./Components/RightSidebar";
import { SetTheme } from "./Components/Elements/SettingsElements/ThemeSelector";
import PostPage from "./Components/PostPage";
import HashtagSearch from "./Components/HashtagSearch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center";

const UserLayout = () => {
  const { unreadCount } = useNotificationCenter();
  return (
    <>
      <Header />
      <div className="flex h-full w-full flex-row overflow-hidden">
        <LeftSidebar unreadCount={unreadCount} />
        <main className="scrollbar-thin h-full w-full overflow-y-auto pb-4">
          <Outlet />
        </main>
        <RightSidebar />
      </div>
    </>
  );
};

const VisitorLayout = () => {
  return (
    <>
      <Header />
      <div className="flex h-full flex-row overflow-hidden">
        <main className="scrollbar-thin h-full w-full flex-grow overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

// Theme selecting
SetTheme(localStorage.theme);

function App() {
  return (
    <div className="app flex h-screen flex-col">
      <Routes>
        {/*Not logged routes*/}
        <Route element={<VisitorLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>
        {/*Logged routes*/}
        <Route element={<UserLayout />}>
          <Route path="/search" element={<Search />} />
          <Route path="/hashtag/*" element={<HashtagSearch />} />
          {/*User routes*/}
          <Route path="/home/*" element={<UserTimeline />} />
          <Route path="/user/:username/*" element={<UserPage />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/notifications" element={<UserNotifications />} />
          <Route path="/messages/*" element={<UserMessages />} />
          <Route path="/following/*" element={<UserFollowing />} />
          {/*Groups routes*/}
          <Route path="/groups/*" element={<GroupList />} />
          <Route path="/groups/profile/:id" element={<GroupProfile />} />

          {/*Post routes*/}
          <Route path="/:username/post/:postid" element={<PostPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
