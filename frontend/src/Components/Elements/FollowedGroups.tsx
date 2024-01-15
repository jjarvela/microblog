import GroupThumbnail from "./GroupThumbnail";

export default function FollowedGroups() {
  return (
    <div className="flex flex-col gap-3 p-2">
      <GroupThumbnail
        groupName="CatLovers"
        groupAdmin="@test"
        groupDescription="This is a test"
        members={84}
        activity="-"
        rule="Anyone can join"
      />

      <GroupThumbnail
        groupName="Dog luv"
        groupAdmin="@test"
        groupDescription="This is a test"
        members={84}
        activity="-"
        rule="Anyone can join"
      />

      <GroupThumbnail
        groupName="BuuttiBois"
        groupAdmin="@Torava"
        groupDescription="Jarkon ja Petrin maja"
        members={2}
        activity="-"
        rule="1st rule: You don't speak about BuuttiBois"
      />
    </div>
  );
}
