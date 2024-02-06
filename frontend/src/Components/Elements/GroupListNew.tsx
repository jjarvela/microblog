import GroupThumbnail from "./SearchThumbnails/GroupThumbnail";

export default function GroupListNew() {
  const placeholderGroups: Group[] = [
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
  ];

  return (
    <div className="flex flex-col gap-3 p-2">
      {placeholderGroups.map((group) => {
        return (
          <GroupThumbnail
            key={
              Math.floor(Math.random() * 1000) +
              "-" +
              Math.floor(Math.random() * 1000)
            }
            group={group}
          />
        );
      })}
    </div>
  );
}
