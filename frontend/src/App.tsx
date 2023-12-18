import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <div className="app flex h-screen flex-col">
      <Header />
      <div className="flex h-full flex-row">
        <LeftSidebar />
        <main className="flex-grow">
          <Routes>
            {/*Universal routes*/}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<LogIn />} />
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
          </Routes>
        </main>
        <RightSidebar />
      </div>
    </div>
  );
}

export default App;
