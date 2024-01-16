type SettingsSlotProps = {
  name: string;
  element: React.ReactNode;
};

function SettingsSlot({ name, element }: SettingsSlotProps) {
  return (
    <div className="flex flex-col items-center border-b border-black25 last:border-b-0 dark:border-white25 sm:flex-row">
      <div className="my-2 w-[33%] min-w-fit select-none text-center md:text-[1.1rem]">
        {name}
      </div>
      <div className="flex h-full w-full min-w-max flex-1 justify-center border-black25 p-2 dark:border-white25 sm:border-l">
        {element}
      </div>
    </div>
  );
}

export default SettingsSlot;
