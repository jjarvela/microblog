import Button from "./Elements/Button";
import GroupThumbnail from "./Elements/GroupThumbnail";
import GroupTopMenu from "./Elements/GroupTopMenu";

const GroupList = () => {
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
      <div className="flex justify-center">
        <GroupTopMenu />
      </div>

      <h2 className="text-center">This is the list of existing groups</h2>

      <div className="m-6 flex justify-end">
        <Button class="btn-primary">Create Group</Button>
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
    </div>
  );
};

export default GroupList;
