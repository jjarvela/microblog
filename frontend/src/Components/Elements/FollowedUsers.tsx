import UserThumbnail from "./SearchThumbnails/UserThumbnail";

export default function FollowedUsers() {
  return (
    <div className="flex flex-col gap-3 p-2">
      <UserThumbnail
        profileName="Test User ✨"
        username="@testuser"
        userDescription="this si test"
        followers={5}
        following={23}
      />
      <UserThumbnail
        profileName="Another User 🙂"
        username="@anotheruser"
        userDescription="Hello! I am new!"
        followers={1}
        following={37}
      />
      <UserThumbnail
        profileName="Fancy User"
        username="@fancyuser"
        userDescription="UwU"
        followers={526}
        following={1893}
      />
      <UserThumbnail
        profileName="Outraged user 951 😤"
        username="@madasitgets"
        userDescription="I will physically fight the Sun"
        followers={487}
        following={794}
      />
    </div>
  );
}
