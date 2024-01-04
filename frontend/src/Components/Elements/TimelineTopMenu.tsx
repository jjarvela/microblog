import TopbarLink from "./TopbarLink";
import StreamlineInterfaceSettingSliderVerticalAdjustmentAdjustControlsFaderVerticalSettingsSlider from "../Icons/StreamlineInterfaceSettingSliderVerticalAdjustmentAdjustControlsFaderVerticalSettingsSlider";
import MaterialSymbolsTagRounded from "../Icons/MaterialSymbolsTagRounded";

function TimelineTopMenu() {
  return (
    <div>
      <nav className="flex flex-row">
        <div className="w-1/3">
          <TopbarLink
            to="following"
            text="Following"
            icon={
              <StreamlineInterfaceSettingSliderVerticalAdjustmentAdjustControlsFaderVerticalSettingsSlider />
            }
          />
        </div>
        <div className="w-1/3">
          <TopbarLink
            to="originals"
            text="Originals"
            icon={
              <StreamlineInterfaceSettingSliderVerticalAdjustmentAdjustControlsFaderVerticalSettingsSlider />
            }
          />
        </div>
        <div className="w-1/3">
          <TopbarLink
            to="mytags"
            text="My Tags"
            icon={<MaterialSymbolsTagRounded />}
          />
        </div>
      </nav>
    </div>
  );
}

export default TimelineTopMenu;
