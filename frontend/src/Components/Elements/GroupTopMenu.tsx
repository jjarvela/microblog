import TopbarLink from "./TopbarLink";
import MaterialSymbolsDiamond from "../Icons/MaterialSymbolsDiamond";
import MaterialSymbolsHeartPlus from "../Icons/MaterialSymbolsHeartPlus";
import MaterialSymbolsNewspaperSharp from "../Icons/MaterialSymbolsNewspaperSharp";
import MaterialSymbolsGroups2Rounded from "../Icons/MaterialSymbolsGroups2Rounded";

function GroupTopMenu() {
  return (
    <div>
      <nav className="flex flex-row">
        <div className="w-auto">
          <TopbarLink
            to="Recent"
            text="Recent Activity"
            icon={<MaterialSymbolsNewspaperSharp />}
          />
        </div>
        <div className="w-auto">
          <TopbarLink
            to="Popular"
            text="Popular"
            icon={<MaterialSymbolsHeartPlus />}
          />
        </div>
        <div className="w-auto">
          <TopbarLink to="New" text="New" icon={<MaterialSymbolsDiamond />} />
        </div>
        <div className="w-auto">
          <TopbarLink
            to="MyGroups"
            text="My Groups"
            icon={<MaterialSymbolsGroups2Rounded />}
          />
        </div>
      </nav>
    </div>
  );
}

export default GroupTopMenu;
