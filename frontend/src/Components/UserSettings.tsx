import Button from "./Elements/Button";
import DropdownInput from "./Elements/DropdownInput";
import SettingsPanel from "./Elements/SettingsPanel";
import SettingsSlot from "./Elements/SettingsSlot";
import TextInput from "./Elements/TextInput";
import ToggleInput from "./Elements/ToggleInput";

const mockListOfLocations = [
  "Finland",
  "Europe",
  "North America",
  "South America",
  "Middle East",
  "Africa",
  "Asia",
  "Oceania",
  "Antarctica",
];

const mockListOfLanguages = ["Finnish", "English", "Swedish"];

const UserSettings = () => {
  return (
    <div className="m-4 flex flex-col gap-4">
      <h2 className="my-4 text-center">Settings</h2>
      <SettingsPanel header="User">
        <SettingsSlot
          name="Public Name"
          element={
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <TextInput class="w-full" />
              <Button class="btn-primary">Update</Button>
            </div>
          }
        />
        <SettingsSlot
          name="Email"
          element={
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <TextInput class="w-full" />
              <Button class="btn-primary">Update</Button>
            </div>
          }
        />
        <SettingsSlot
          name="Location"
          element={
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <DropdownInput items={mockListOfLocations} class="w-full" />
              <Button class="btn-primary">Update</Button>
            </div>
          }
        />
      </SettingsPanel>
      <SettingsPanel header="Site">
        <SettingsSlot
          name="Language"
          element={
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <DropdownInput items={mockListOfLanguages} class="w-full" />
              <Button class="btn-primary">Update</Button>
            </div>
          }
        />
        <SettingsSlot
          name="Dark Mode"
          element={
            <div className="flex w-full flex-row items-center justify-center gap-3">
              <p className="select-none">Off</p>
              <ToggleInput
                onToggle={(val) =>
                  console.log("Dark mode toggled to state: " + String(val))
                }
              />
              <p className="select-none">On</p>
            </div>
          }
        />
      </SettingsPanel>
    </div>
  );
};

export default UserSettings;
