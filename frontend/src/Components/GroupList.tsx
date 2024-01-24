import Button from "./Elements/Button";
import GroupThumbnail from "./Elements/SearchThumbnails/GroupThumbnail";
import { useRef } from "react";
import CreateGroupModal from "./Elements/Modals/CreateGroupModal";
import TopPageNav from "./Elements/TopPageNav";
import MaterialSymbolsNewspaperSharp from "./Icons/MaterialSymbolsNewspaperSharp";
import MaterialSymbolsHeartPlus from "./Icons/MaterialSymbolsHeartPlus";
import MaterialSymbolsDiamond from "./Icons/MaterialSymbolsDiamond";
import MaterialSymbolsGroups2Rounded from "./Icons/MaterialSymbolsGroups2Rounded";
import { Routes, Route, Navigate } from "react-router";
import FollowedGroups from "./Elements/FollowedGroups";
import FollowedHashtags from "./Elements/FollowedHashtags";
import FollowedUsers from "./Elements/FollowedUsers";

const GroupList = () => {
  const createGroupModal = useRef<HTMLDialogElement>(null);
  const placeholderGroups: Group[] = [
    {
      groupName: "CatLovers",
      groupAdmin: {
        userName: "@testuser",
        screenName: "Test User ✨",
        followers: 5,
        following: 23,
      },
      groupDescription: "This is a test",
      groupMembers: 84,
      groupCreated: new Date(),
      recentActivity: "--",
      joinRule: "everyone",
    },
    {
      groupName: "Dog luv",
      groupAdmin: {
        userName: "@dickerson99",
        screenName: "Dickerson",
        followers: 420,
        following: 666,
      },
      groupDescription: "This is a test",
      groupMembers: 84,
      groupCreated: new Date(),
      recentActivity: "--",
      joinRule: "permission",
    },
    {
      groupName: "Baby luvvers",
      groupAdmin: {
        userName: "@anotheruser",
        screenName: "Another User 🙂",
        followers: 1,
        following: 37,
      },
      groupDescription: "This is a test",
      groupMembers: 84,
      groupCreated: new Date(),
      recentActivity: "--",
      joinRule: "everyone",
    },
    {
      groupName: "Haters",
      groupAdmin: {
        userName: "@madasitgets",
        screenName: "Outraged user 951 😤",
        followers: 487,
        following: 794,
      },
      groupDescription: "IN THE UNDYING WORDS OF PÄIVI RÄSÄNEN: 'EI!",
      groupMembers: 84,
      groupCreated: new Date(),
      recentActivity: "--",
      joinRule: "permission",
    },

    {
      groupName: "BuuttiBois",
      groupAdmin: {
        userName: "@Torava",
        screenName: "Jarkon ja Pertin Oma Tili",
        followers: 999999,
        following: 2,
      },
      groupDescription:
        "Jarkon ja Petrin maja. 1st rule: You don't speak about BuuttiBois",
      groupMembers: 2,
      groupCreated: new Date(),
      recentActivity: "--",
      joinRule: "closed",
    },
  ];
  return (
    <div>
      <div className="flex basis-4/12 justify-center">
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
      <div className="flex flex-col gap-6">
        {placeholderGroups.map((group) => {
          return (
            <GroupThumbnail
              key={
                Math.floor(Math.random() * 1000) +
                "" +
                Math.floor(Math.random() * 1000)
              }
              group={group}
            />
          );
        })}
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
          <Route index element={<Navigate to={"following"} />} />
          <Route path="people" element={<FollowedUsers />} />
          <Route path="groups" element={<FollowedGroups />} />
          <Route path="hashtags" element={<FollowedHashtags />} />
        </Routes>
      </div>
    </div>
  );
};

export default GroupList;
