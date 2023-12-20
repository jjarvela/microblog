import Button from "./Elements/Button";
import GroupThumbnail from "./Elements/GroupThumbnail";
import UserThumbnail from "./Elements/UserThumbnail";
import MaterialSymbolsSearchRounded from "./Icons/MaterialSymbolsSearchRounded";

const Search = () => {
  return (
    <div className="my-1 flex flex-col gap-4">
      <h2 className="mx-2">This is the main hub for search</h2>
      <div className="my-2 text-center">
        <input id="search" type="text"></input>{" "}
        <label htmlFor="search">
          <Button class="btn-primary text-lg">
            <MaterialSymbolsSearchRounded />
          </Button>
        </label>
      </div>

      <UserThumbnail
        profileName="Test User"
        username="@text"
        userDescription="this si test"
        followers={5}
        following={23}
      />
      <GroupThumbnail
        groupName="Group name"
        groupAdmin="@test"
        groupDescription="This is a test"
        members={84}
        activity="-"
        rule="Anyone can join"
      />
    </div>
  );
};

export default Search;
