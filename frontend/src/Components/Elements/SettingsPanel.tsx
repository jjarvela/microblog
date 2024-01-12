import MaterialSymbolsExpandMoreRounded from "../Icons/MaterialSymbolsExpandMoreRounded";

type SettingsPanelProps = {
  header: string;
  children: React.ReactNode;
};

function SettingsPanel({ header, children }: SettingsPanelProps) {
  return (
    <div className="min-w-fit rounded-xl border border-black50">
      <div className="relative flex flex-row items-center justify-center rounded-t-xl bg-black25 hover:bg-black50 dark:bg-white25">
        <h3 className="my-2 w-full select-none text-center">{header}</h3>
        <MaterialSymbolsExpandMoreRounded
          className="absolute right-2"
          width={"2.5rem"}
          height={"2.5rem"}
        />
      </div>
      {children}
    </div>
  );
}

export default SettingsPanel;
