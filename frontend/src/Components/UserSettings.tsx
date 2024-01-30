import Button from "./Elements/Button";
import DropdownInput from "./Elements/Inputs/DropdownInput";
import InfoDot from "./Elements/InfoDot";
import SettingsPanel from "./Elements/SettingsElements/SettingsPanel";
import SettingsSlot from "./Elements/SettingsElements/SettingsSlot";
import TextInput from "./Elements/Inputs/TextInput";
import MaterialSymbolsAccountCircle from "./Icons/MaterialSymbolsAccountCircle";
import MaterialSymbolsPrivacyTipRounded from "./Icons/MaterialSymbolsPrivacyTipRounded";
import MaterialSymbolsSettingsApplicationsRounded from "./Icons/MaterialSymbolsSettingsApplicationsRounded";
import { useContext, useState } from "react";
import { UserContext } from "../UserWrapper";
import { locationList } from "../globalData";
import ThemeSelector from "./Elements/SettingsElements/ThemeSelector";

const mockListOfLanguages = ["English", "Finnish"];

const followingPermission = ["Anyone", "Ask Permission"];
const postVisibility = ["Anyone", "Only Followers"];

const UserSettings = () => {
  const user = useContext(UserContext);
  const [screenName, setScreenName] = useState(user?.user?.screenName || "");
  const [email, setEmail] = useState(user?.user?.email || "");
  const [location, setLocation] = useState(
    user?.user?.location || locationList[0],
  );

  return (
    <div className="mx-4 flex flex-col gap-4">
      <h2 className="my-4 text-center">Settings</h2>
      <SettingsPanel header="User" icon={<MaterialSymbolsAccountCircle />}>
        <SettingsSlot
          nameElements={<p>Public Name</p>}
          element={
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <TextInput
                className="w-full"
                value={screenName}
                onChange={(e) => setScreenName(e.target.value)}
              />
              <Button
                onClick={() =>
                  user.user &&
                  user.setUser({ ...user.user, screenName: screenName })
                }
                class="btn-primary"
              >
                Update
              </Button>
            </div>
          }
        />
        <SettingsSlot
          nameElements={<p>Email</p>}
          element={
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <TextInput
                className="w-full"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                class="btn-primary"
                onClick={() =>
                  user.user && user.setUser({ ...user.user, email: email })
                }
              >
                Update
              </Button>
            </div>
          }
        />
        <SettingsSlot
          nameElements={<p>Password</p>}
          element={
            <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row">
              <Button class="btn-primary">Request Password Reset</Button>
              <InfoDot text="Reset link will be sent to the current email address." />
            </div>
          }
        />
        <SettingsSlot
          nameElements={<p>Location</p>}
          element={
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <DropdownInput
                items={locationList}
                class="w-full"
                initialIndex={locationList.indexOf(location)}
                onChange={(v) => setLocation(v)}
              />
              <Button
                class="btn-primary"
                onClick={() =>
                  user.user &&
                  user.setUser({ ...user.user, location: location })
                }
              >
                Update
              </Button>
            </div>
          }
        />
      </SettingsPanel>
      <SettingsPanel
        header="Privacy"
        icon={<MaterialSymbolsPrivacyTipRounded />}
      >
        <SettingsSlot
          nameElements={
            <>
              <p>Allow Following</p>
              <InfoDot text="Who can follow your profile?" />
            </>
          }
          element={
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <DropdownInput items={followingPermission} class="w-full" />
              <Button class="btn-primary">Update</Button>
            </div>
          }
        />
        <SettingsSlot
          nameElements={
            <>
              <p>Post Visibility</p>
              <InfoDot text="Who can view your posts?" />
            </>
          }
          element={
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <DropdownInput items={postVisibility} class="w-full" />
              <Button class="btn-primary">Update</Button>
            </div>
          }
        />
      </SettingsPanel>
      <SettingsPanel
        header="Site"
        icon={<MaterialSymbolsSettingsApplicationsRounded />}
      >
        <SettingsSlot
          nameElements={<p>Language</p>}
          element={
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <DropdownInput items={mockListOfLanguages} class="w-full" />
              <Button class="btn-primary">Update</Button>
            </div>
          }
        />
        <SettingsSlot
          nameElements={<p>Color Theme</p>}
          element={
            <div className="flex w-full flex-row items-center justify-center gap-3">
              <ThemeSelector />
            </div>
          }
        />
      </SettingsPanel>
    </div>
  );
};

export default UserSettings;
