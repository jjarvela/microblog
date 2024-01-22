import { useState } from "react";
import GroupMemberThumbnail from "./GroupMemberThumbnail";

type User = {
  id: number;
  profileName: string;
};

const mockUsers: User[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  profileName: `Dickerson${index + 1}`,
}));

const initialUsersToShow = 10;

type GroupMembersBoxProps = {
  profileName?: string;
  ownerOptions?: boolean;
  pinnedPost?: boolean;
  class?: string;
  text?: string;
};

function GroupMembersBox({ class: classAdd }: GroupMembersBoxProps) {
  const [usersToShow, setUsersToShow] = useState(initialUsersToShow);

  const handleLoadMore = () => {
    setUsersToShow((prevCount) => prevCount + initialUsersToShow);
  };
  return (
    <div className={"timeline-box relative overflow-hidden" + " " + classAdd}>
      <div className="flex flex-row justify-center">
        <h3>Members</h3>
      </div>
      <div className="grid h-60 grid-cols-3 overflow-y-auto sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {mockUsers.slice(0, usersToShow).map((user) => (
          <GroupMemberThumbnail key={user.id} profileName={user.profileName} />
        ))}
      </div>
      {usersToShow < mockUsers.length && (
        <div className="mt-2 flex justify-center">
          <button className="btn-primary" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default GroupMembersBox;
