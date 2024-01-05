import { useRef } from "react";
import Button from "./Elements/Button";
import PostModal from "./Elements/PostModal";
import SidebarLink from "./Elements/SidebarLink";
import MaterialSymbolsAccountCircle from "./Icons/MaterialSymbolsAccountCircle";
import MaterialSymbolsEditSquareOutlineRounded from "./Icons/MaterialSymbolsEditSquareOutlineRounded";
import MaterialSymbolsGroupsRounded from "./Icons/MaterialSymbolsGroupsRounded";
import MaterialSymbolsHomeRounded from "./Icons/MaterialSymbolsHomeRounded";
import MaterialSymbolsMailRounded from "./Icons/MaterialSymbolsMailRounded";
import MaterialSymbolsNotificationsRounded from "./Icons/MaterialSymbolsNotificationsRounded";
import MaterialSymbolsSearchRounded from "./Icons/MaterialSymbolsSearchRounded";
import MaterialSymbolsSettingsRounded from "./Icons/MaterialSymbolsSettingsRounded";
import PhHashStraightBold from "./Icons/PhHashStraightBold";
import { useBreakpoint } from "../Hooks/BreakpointHook";

function LeftSidebar() {
  const postModal = useRef<HTMLDialogElement>(null);
  const { isMd } = useBreakpoint("md");

  return (
    <div className="col scrollbar-thin flex h-full w-16 flex-shrink-0 flex-col overflow-auto border-r border-black50 dark:to-black75 md:w-full md:max-w-[16rem] short:overflow-hidden">
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
      <div
        id="newPostButton"
        className="flex items-center justify-center px-1 py-4 md:px-10 mid:py-10"
      >
        <Button
          class="btn-primary flex h-12 w-12 items-center justify-center p-0 text-xl md:h-16 md:w-16 md:text-2xl"
          onClick={() => postModal.current?.showModal()}
          type="button"
        >
          <MaterialSymbolsEditSquareOutlineRounded />
        </Button>
      </div>
      <div className="mb-4 flex h-full flex-col items-center justify-end">
        {isMd ? <p>© 2024 Team Yellow</p> : <p>©</p>}
      </div>
      <PostModal
        profileName="Temp Poster"
        username="@tempposter"
        text=""
        tags={[]}
        refObject={postModal}
      />
    </div>
  );
}

export default LeftSidebar;
