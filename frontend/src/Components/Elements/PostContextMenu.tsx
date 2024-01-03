import { Link } from "react-router-dom";
import { MdiDotsHorizontal } from "../Icons/MdiThreeDots";
import { useState } from "react";

type PostContextMenuProps = {
  class?: string;
};

function PostContextMenu({ class: classAdd }: PostContextMenuProps) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div id="postContextMenu" className={"relative" + " " + classAdd}>
        <button
          className="rounded-xl border border-black25 px-2 py-1 text-lg hover:border-black50 hover:bg-black25 dark:border-white25"
          onClick={() => setShowMenu(!showMenu)}
        >
          <MdiDotsHorizontal />
        </button>
        {showMenu && (
          <div className="relative">
            <div className="absolute right-0 top-0 flex flex-col border border-black50 bg-white dark:bg-black">
              <Link
                to={""}
                className="border-b border-black50 px-4 py-2 last:border-0"
              >
                Edit
              </Link>
              <Link
                to={""}
                className="border-b border-black50 px-4 py-2 last:border-0"
              >
                Share
              </Link>
              <Link
                to={""}
                className="border-b border-black50 px-4 py-2 last:border-0"
              >
                Delete
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PostContextMenu;
