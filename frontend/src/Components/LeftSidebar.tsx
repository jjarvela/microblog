import SidebarLink from "./Elements/SidebarLink";
import MaterialSymbolsAccountCircle from "./Icons/MaterialSymbolsAccountCircle";
import MaterialSymbolsGroupsRounded from "./Icons/MaterialSymbolsGroupsRounded";
import MaterialSymbolsHomeRounded from "./Icons/MaterialSymbolsHomeRounded";
import MaterialSymbolsMailRounded from "./Icons/MaterialSymbolsMailRounded";
import MaterialSymbolsNotificationsRounded from "./Icons/MaterialSymbolsNotificationsRounded";
import MaterialSymbolsSearchRounded from "./Icons/MaterialSymbolsSearchRounded";
import MaterialSymbolsSettingsRounded from "./Icons/MaterialSymbolsSettingsRounded";
import PhHashStraightBold from "./Icons/PhHashStraightBold";

function LeftSidebar() {
  return (
    <div className="col flex h-full w-full max-w-[16rem] flex-col border-r border-black50 dark:to-black75">
      <nav>
        <SidebarLink
          to="/home"
          text="Home"
          icon={<MaterialSymbolsHomeRounded />}
        />
        <SidebarLink
          to="/user/:username"
          text="Profile"
          icon={<MaterialSymbolsAccountCircle />}
        />
        <SidebarLink
          to="/groups"
          text="Groups"
          icon={<MaterialSymbolsGroupsRounded />}
        />
        <SidebarLink
          to="/search"
          text="Search"
          icon={<MaterialSymbolsSearchRounded />}
        />
        <SidebarLink
          to="/settings"
          text="Settings"
          icon={<MaterialSymbolsSettingsRounded />}
        />
        <SidebarLink
          to="/notifications"
          text="Notifications"
          icon={<MaterialSymbolsNotificationsRounded />}
        />
        <SidebarLink
          to="/messages"
          text="Messages"
          icon={<MaterialSymbolsMailRounded />}
        />
        <SidebarLink
          to="/following"
          text="Following"
          icon={<PhHashStraightBold />}
        />
      </nav>
      <div className="mb-4 flex h-full flex-col items-center justify-end">
        <p>© 2023 Team Yellow</p>
      </div>
    </div>
  );
}

export default LeftSidebar;
