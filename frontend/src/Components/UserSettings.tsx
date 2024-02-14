import Button from "./Elements/Button";
import DropdownInput from "./Elements/Inputs/DropdownInput";
// import InfoDot from "./Elements/InfoDot";
import SettingsPanel from "./Elements/SettingsElements/SettingsPanel";
import SettingsSlot from "./Elements/SettingsElements/SettingsSlot";
import TextInput from "./Elements/Inputs/TextInput";
import MaterialSymbolsAccountCircle from "./Icons/MaterialSymbolsAccountCircle";
// import MaterialSymbolsPrivacyTipRounded from "./Icons/MaterialSymbolsPrivacyTipRounded";
import MaterialSymbolsSettingsApplicationsRounded from "./Icons/MaterialSymbolsSettingsApplicationsRounded";
import { useEffect, useRef, useState } from "react";
import { useUser } from "../UserWrapper";
import { locationList } from "../globalData";
import ThemeSelector from "./Elements/SettingsElements/ThemeSelector";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "../Services/userService";
import MaterialSymbolsKeyRounded from "./Icons/MaterialSymbolsKeyRounded";
import ConfirmModal from "./Elements/Modals/ConfirmModal";
import { useNavigate } from "react-router";

// const mockListOfLanguages = ["English", "Finnish"];
// const followingPermission = ["Anyone", "Ask Permission"];
// const postVisibility = ["Anyone", "Only Followers"];

const UserSettings = () => {
  const user = useUser();
  const [screenName, setScreenName] = useState(user?.user?.screenName || "");
  const [email, setEmail] = useState(user?.user?.email || "");
  const [location, setLocation] = useState(
    user?.user?.location || locationList[0],
  );
  const [birthday, setBirthday] = useState<string>(
    user.user?.birthday.toISOString().split("T")[0] || "",
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const deleteConfirm = useRef<HTMLDialogElement>(null);

  const settingsUpdateMutation = useMutation({
    mutationKey: ["settings", user?.user?.id],
    mutationFn: (userObj: Partial<User>) =>
      userService.editUser(user?.user?.id || "", userObj),
  });

  const confirmEdit = (prop: string, value: unknown) => {
    settingsUpdateMutation.mutate(
      { [prop]: value },
      {
        onSettled: () =>
          queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
      },
    );
  };

  const deleteAccountMutation = useMutation({
    mutationFn: () => userService.deleteUser(user.user?.id || ""),
    onSettled: () => {
      navigate("/");
      user.onLogout();
    },
  });

  useEffect(() => {
    if (user.user) {
      setScreenName(user.user.screenName);
      setEmail(user.user.email);
      setLocation(user.user.location);
      setBirthday(user.user.birthday.toISOString().split("T")[0]);
    }
  }, [user.user]);

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
                onClick={() => {
                  user.user &&
                    user.setUser({ ...user.user, screenName: screenName });
                  confirmEdit("screenName", screenName);
                }}
                className="btn-primary"
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
                className="btn-primary"
                onClick={() => {
                  user.user && user.setUser({ ...user.user, email: email });
                  confirmEdit("email", email);
                }}
              >
                Update
              </Button>
            </div>
          }
        />
        {/* Removed for lack of implementation */}
        {/* <SettingsSlot
          nameElements={<p>Password</p>}
          element={
            <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row">
              <Button className="btn-primary">Request Password Reset</Button>
              <InfoDot text="Reset link will be sent to the current email address." />
            </div>
          }
        /> */}
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
                className="btn-primary"
                onClick={() => {
                  user.user &&
                    user.setUser({ ...user.user, location: location });
                  confirmEdit("location", location);
                }}
              >
                Update
              </Button>
            </div>
          }
        />
        <SettingsSlot
          nameElements={<p>Birthday</p>}
          element={
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <input
                id="birthday"
                type="date"
                onChange={(e) => setBirthday(e.target.value)}
                placeholder="birthday"
                className="w-full"
                value={birthday}
              />
              <Button
                className="btn-primary"
                onClick={() => {
                  user.user &&
                    user.setUser({
                      ...user.user,
                      birthday: new Date(birthday || ""),
                    });
                  confirmEdit(
                    "birthday",
                    new Date(birthday || "").toISOString(),
                  );
                }}
              >
                Update
              </Button>
            </div>
          }
        />
      </SettingsPanel>
      {/* Removed for lack of implementation */}
      {/* <SettingsPanel
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
              <Button className="btn-primary">Update</Button>
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
              <Button className="btn-primary">Update</Button>
            </div>
          }
        />
      </SettingsPanel> */}
      <SettingsPanel
        header="Site"
        icon={<MaterialSymbolsSettingsApplicationsRounded />}
      >
        {/* Removed for lack of implementation */}
        {/* <SettingsSlot
          nameElements={<p>Language</p>}
          element={
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <DropdownInput items={mockListOfLanguages} class="w-full" />
              <Button className="btn-primary">Update</Button>
            </div>
          }
        /> */}
        <SettingsSlot
          nameElements={<p>Color Theme</p>}
          element={
            <div className="flex w-full flex-row items-center justify-center gap-3">
              <ThemeSelector />
            </div>
          }
        />
      </SettingsPanel>
      <SettingsPanel header="Account" icon={<MaterialSymbolsKeyRounded />}>
        <SettingsSlot
          nameElements={<p>Delete Account</p>}
          element={
            <div className="flex w-full flex-row items-center justify-center gap-3">
              <Button
                className="rounded-full border border-warning bg-warningBg px-4 py-2 text-warning hover:bg-warning hover:text-white dark:border-warningDark dark:bg-warningBgDark dark:text-warningDark dark:hover:bg-warning dark:hover:text-white"
                onClick={() => deleteConfirm.current?.showModal()}
              >
                Delete Account
              </Button>
            </div>
          }
        />
      </SettingsPanel>
      <ConfirmModal
        message="Delete your account?"
        confirmText="Delete"
        cancelText="Cancel"
        children={<p>We will miss you {user.user?.screenName}...</p>}
        confirmCallback={() => deleteAccountMutation.mutate()}
        refObject={deleteConfirm}
      />
    </div>
  );
};

export default UserSettings;
