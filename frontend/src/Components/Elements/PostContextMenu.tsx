import { Link } from "react-router-dom";
import { MdiDotsHorizontal } from "../Icons/MdiThreeDots";
import { useState } from "react";
import MaterialSymbolsEditOutlineRounded from "../Icons/MaterialSymbolsEditOutlineRounded";
import MaterialSymbolsDeleteForeverOutlineRounded from "../Icons/MaterialSymbolsDeleteForeverOutlineRounded";
import MaterialSymbolsShareOutline from "../Icons/MaterialSymbolsShareOutline";
import MaterialSymbolsFlagRounded from "../Icons/MaterialSymbolsFlagRounded";

type PostContextMenuProps = {
  class?: string;
  ownerOptions?: boolean;
};

function PostContextMenu({
  class: classAdd,
  ownerOptions,
}: PostContextMenuProps) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div id="postContextMenu" className={"overflow-visible" + " " + classAdd}>
        <button
          className="rounded-xl border border-black25 px-2 py-1 text-lg hover:border-black50 hover:bg-black25 dark:border-white25 dark:hover:bg-white25"
          onClick={() => setShowMenu(!showMenu)}
          onBlur={(e) => {
            if (!e.relatedTarget) setShowMenu(false);
            else e.target.focus(); // Recapture focus to keep this onBlur working.
          }}
          tabIndex={0}
        >
          <MdiDotsHorizontal />
        </button>
        {showMenu && (
          <div className="context-dropdown" tabIndex={-1}>
            <div className="absolute z-10 flex -translate-x-[30%] flex-col rounded-md border border-black50 bg-white dark:bg-black">
              {ownerOptions && (
                <>
                  {/* TODO: Once clicked, buttons should hide the dropdown menu and do their functionality. */}
                  <Link
                    to={"./edit"}
                    className="context-dropdown flex flex-row items-center gap-1 border-b border-black50 px-3 py-2 last:border-0 hover:bg-black25 dark:hover:bg-white25"
                  >
                    <MaterialSymbolsEditOutlineRounded />
                    Edit
                  </Link>
                  <Link
                    to={""}
                    className="flex flex-row items-center gap-1 border-b border-black50 px-3 py-2 last:border-0 hover:bg-black25 dark:hover:bg-white25"
                  >
                    <MaterialSymbolsDeleteForeverOutlineRounded />
                    Delete
                  </Link>
                </>
              )}
              <Link
                to={""}
                className="flex flex-row items-center gap-1 border-b border-black50 px-3 py-2 last:border-0 hover:bg-black25 dark:hover:bg-white25"
              >
                <MaterialSymbolsShareOutline />
                Share
              </Link>
              <Link
                to={""}
                className="flex flex-row items-center gap-1 border-b border-black50 px-3 py-2 last:border-0 hover:bg-black25 dark:hover:bg-white25"
              >
                <MaterialSymbolsFlagRounded />
                Report
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PostContextMenu;
