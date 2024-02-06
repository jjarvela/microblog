import { useEffect, useRef, useState } from "react";
import Button from "./Elements/Button";
import PostModal from "./Elements/Modals/PostModal";
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
import MdiDotsVertical from "./Icons/MdiDotsVertical";
import { useUser } from "../UserWrapper";

function LeftSidebar() {
  const user = useUser();
  const postModal = useRef<HTMLDialogElement>(null);
  const { isMd } = useBreakpoint("md");
  const { isXs } = useBreakpoint("xs");
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (isXs) setShowSidebar(true);
    else setShowSidebar(false);
  }, [isXs]);

  return (
    <>
      {/* Button for toggling the menu in the xs view. */}
      {!isXs && (
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          onBlur={(e) => {
            if (!e.relatedTarget) setShowSidebar(false);
            else e.target.focus(); // Recapture focus to keep this onBlur working.
          }}
          className="absolute top-0 m-1 flex items-center justify-center rounded-md border border-black50 bg-white p-2 text-xl hover:border-black50 hover:bg-black25 dark:border-white25 dark:bg-black dark:hover:bg-white25"
          tabIndex={0}
        >
          <MdiDotsVertical />
        </button>
      )}
      <div>
        {showSidebar && (
          <div
            // Different style for the xs view.
            className={
              isXs
                ? "scrollbar-thin flex h-full w-16 flex-shrink-0 flex-col overflow-auto border-r border-black50 dark:to-black75 md:w-full md:max-w-[16rem] short:overflow-hidden"
                : "scrollbar-thin absolute top-[3.5rem] z-10 flex w-16 flex-shrink-0 flex-col overflow-auto rounded-md border border-black50 bg-white shadow-md dark:border-black75 dark:bg-black"
            }
            tabIndex={-1}
          >
            <nav>
              <SidebarLink
                to="/home"
                text="Home"
                icon={<MaterialSymbolsHomeRounded />}
              />
              <SidebarLink
                to={
                  user.user?.userName
                    ? "/user/" + user.user.userName
                    : "/user/:username"
                }
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
                className="btn-primary flex h-12 w-12 items-center justify-center p-0 text-xl md:h-16 md:w-16 md:text-2xl"
                onClick={() => postModal.current?.showModal()}
                type="button"
              >
                <MaterialSymbolsEditSquareOutlineRounded />
              </Button>
            </div>
            {isXs && (
              <div className="mb-4 flex h-full flex-col items-center justify-end">
                {isMd ? <p>© 2024 Team Yellow</p> : <p>©</p>}
              </div>
            )}
          </div>
        )}
        <PostModal
          user={
            user?.user || {
              userName: "",
              screenName: "",
              followers: 0,
              following: 0,
            }
          }
          text=""
          tags={[]}
          refObject={postModal}
          mode="post"
        />
      </div>
    </>
  );
}

export default LeftSidebar;
