import Button from "./Elements/Button";
import { useRef } from "react";
import CreateGroupModal from "./Elements/Modals/CreateGroupModal";
import TopPageNav from "./Elements/TopPageNav";
import MaterialSymbolsNewspaperSharp from "./Icons/MaterialSymbolsNewspaperSharp";
import MaterialSymbolsHeartPlus from "./Icons/MaterialSymbolsHeartPlus";
import MaterialSymbolsDiamond from "./Icons/MaterialSymbolsDiamond";
import MaterialSymbolsGroups2Rounded from "./Icons/MaterialSymbolsGroups2Rounded";
import { Routes, Route, Navigate } from "react-router";
import GroupListMyGroups from "./Elements/GroupListMyGroups";
import GroupListNew from "./Elements/GroupListNew";
import GroupListPopular from "./Elements/GroupListPopular";
import GroupListRecentActivity from "./Elements/GroupListRecentActivity";
import NotFound from "./NotFound";

const GroupList = () => {
  const createGroupModal = useRef<HTMLDialogElement>(null);
  return (
    <div>
      <div className="flex basis-4/12 justify-center">
        <nav className="flex flex-row justify-center gap-0 border-b-[1px] border-primary">
          <TopPageNav
            destination="recent-activity"
            linkName="Recent Activity"
            icon={MaterialSymbolsNewspaperSharp}
          />
          <TopPageNav
            destination="popular"
            linkName="Popular"
            icon={MaterialSymbolsHeartPlus}
          />
          <TopPageNav
            destination="new"
            linkName="New"
            icon={MaterialSymbolsDiamond}
          />
          <TopPageNav
            destination="my-groups"
            linkName="My Groups"
            icon={MaterialSymbolsGroups2Rounded}
          />
        </nav>
      </div>

      <h2 className="my-4 text-center">Group Hub</h2>

      <div className="m-6 flex justify-end">
        <Button
          class="btn-primary"
          onClick={() => createGroupModal.current?.showModal()}
          type="button"
        >
          Create Group
        </Button>
      </div>

      <CreateGroupModal
        confirmText={"Create"}
        cancelText={"Cancel"}
        refObject={createGroupModal}
        tags={[]}
        confirmCallback={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="scrollbar-thin overflow-y-auto">
        <Routes>
          <Route index element={<Navigate to="/groups/recent-activity" />} />
          <Route path="recent-activity" element={<GroupListRecentActivity />} />
          <Route path="popular" element={<GroupListPopular />} />
          <Route path="new" element={<GroupListNew />} />
          <Route path="my-groups" element={<GroupListMyGroups />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default GroupList;
