import Button from "./Elements/Button";
import GroupThumbnail from "./Elements/GroupThumbnail";
import GroupTopMenu from "./Elements/GroupTopMenu";

const GroupList = () => {
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
          groupName="Baby luvvers"
          groupAdmin="@test"
          groupDescription="This is a test"
          members={84}
          activity="-"
          rule="Anyone can join"
        />

        <GroupThumbnail
          groupName="Haters"
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
    </div>
  );
};

export default GroupList;
