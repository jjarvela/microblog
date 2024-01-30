import GroupThumbnail from "./SearchThumbnails/GroupThumbnail";

export default function GroupListRecentPopular() {
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
