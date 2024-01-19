import GroupMemberThumbnail from "./GroupMemberThumbnail";

type GroupMembersBoxProps = {
  profileName?: string;
  ownerOptions?: boolean;
  pinnedPost?: boolean;
  class?: string;
  text?: string;
};

function GroupMembersBox({ class: classAdd }: GroupMembersBoxProps) {
  return (
    <div className={"timeline-box relative overflow-hidden" + " " + classAdd}>
      <div className="flex flex-row justify-center">
        <h3 className="">Members</h3>
      </div>
      <div className="flex flex-row">
        <GroupMemberThumbnail profileName="Dickerson" />
        <GroupMemberThumbnail profileName="Dickerson" />
        <GroupMemberThumbnail profileName="Dickerson" />
        <GroupMemberThumbnail profileName="Dickerson" />
        <GroupMemberThumbnail profileName="Dickerson" />
        <GroupMemberThumbnail profileName="Dickerson" />
        <GroupMemberThumbnail profileName="Dickerson" />
        <GroupMemberThumbnail profileName="Dickerson" />
        <GroupMemberThumbnail profileName="Dickerson" />
        <GroupMemberThumbnail profileName="Dickerson" />
        <GroupMemberThumbnail profileName="Dickerson" />
        <GroupMemberThumbnail profileName="Dickerson" />
        <GroupMemberThumbnail profileName="Dickerson" />
        <GroupMemberThumbnail profileName="Dickerson" />
        <GroupMemberThumbnail profileName="Dickerson" />
      </div>
    </div>
  );
}

export default GroupMembersBox;
