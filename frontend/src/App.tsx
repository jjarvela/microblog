import { Routes, Route, Outlet } from "react-router-dom";
import UserTimeline from "./Components/UserTimeline";
import UserProfile from "./Components/UserProfile";
import UserSettings from "./Components/UserSettings";
import UserNotifications from "./Components/UserNotifications";
import UserMessages from "./Components/UserMessages";
import UserFollowing from "./Components/UserFollowing";
import GroupList from "./Components/GroupList";
import GroupProfile from "./Components/GroupProfile";
import Landing from "./Components/Landing";
import LogIn from "./Components/LogIn";
import Search from "./Components/Search";
import Header from "./Components/Header";
import LeftSidebar from "./Components/LeftSidebar";
import RightSidebar from "./Components/RightSidebar";

const UserLayout = () => {
  return (
    <>
      <Header />
      <div className="flex h-full w-full flex-row overflow-hidden">
        <LeftSidebar />
        <main className="scrollbar-thin h-full w-full overflow-y-scroll pb-4">
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
      <div className="flex h-full flex-row">
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </>
  );
};

function App() {
  return (
    <div className="app flex h-screen flex-col">
      <Routes>
        {/*Not logged routes*/}
        <Route element={<VisitorLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LogIn />} />
        </Route>
        {/*Logged routes*/}
        <Route element={<UserLayout />}>
          <Route path="/search" element={<Search />} />

          {/*User routes*/}
          <Route path="/home" element={<UserTimeline />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/notifications" element={<UserNotifications />} />
          <Route path="/messages" element={<UserMessages />} />
          <Route path="/following" element={<UserFollowing />} />

          {/*Group routes*/}
          <Route path="/groups" element={<GroupList />} />
          <Route path="/groups/:id" element={<GroupProfile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
