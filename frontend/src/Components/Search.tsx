import Button from "./Elements/Button";
import GroupThumbnail from "./Elements/GroupThumbnail";
import { ImageThumb } from "./Elements/ImageThumb";
import UserThumbnail from "./Elements/UserThumbnail";
import MaterialSymbolsAccountCircle from "./Icons/MaterialSymbolsAccountCircle";
import MaterialSymbolsGroupsRounded from "./Icons/MaterialSymbolsGroupsRounded";
import { MaterialSymbolsPhotoCameraRounded } from "./Icons/MaterialSymbolsPhotoCameraRounded";
import MaterialSymbolsSearchRounded from "./Icons/MaterialSymbolsSearchRounded";

const Search = () => {
  return (
    <div className="mx-2 my-1">
      <h2>This is the main hub for search</h2>
      <div className="my-2 text-center">
        <input id="search" type="text"></input>{" "}
        <label htmlFor="search">
          <Button class="btn-primary text-lg">
            <MaterialSymbolsSearchRounded />
          </Button>
        </label>
      </div>

      <div className="flex justify-start gap-2">
        <h1>
          <MaterialSymbolsAccountCircle />
        </h1>
        <h3>Users</h3>
      </div>

      <div className="my-2">
        <UserThumbnail
          profileName="Test User"
          username="@text"
          userDescription="this si test"
          followers={5}
          following={23}
        />
      </div>

      <div className="flex justify-start gap-2">
        <h1>
          <MaterialSymbolsGroupsRounded />
        </h1>
        <h3>Groups</h3>
      </div>

      <div className="my-2">
        <GroupThumbnail
          groupName="Group name"
          groupAdmin="@test"
          groupDescription="This is a test"
          members={84}
          activity="-"
          rule="Anyone can join"
        />
      </div>

      <div className="flex justify-start gap-2">
        <h1>
          <MaterialSymbolsPhotoCameraRounded />
        </h1>
        <h3>Media</h3>
      </div>

      <div className="mx-2 my-2 flex flex-wrap gap-2">
        <ImageThumb
          image="https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          width={150}
          height={150}
        />

        <ImageThumb
          image="https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          width={150}
          height={150}
        />

        <ImageThumb
          image="https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          width={150}
          height={150}
        />

        <ImageThumb
          image="https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          width={150}
          height={150}
        />

        <ImageThumb
          image="https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          width={150}
          height={150}
        />

        <ImageThumb
          image="https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          width={150}
          height={150}
        />

        <ImageThumb
          image="https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          width={150}
          height={150}
        />

        <ImageThumb
          image="https://images.pexels.com/photos/5340051/pexels-photo-5340051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
};

export default Search;
