import { useState } from "react";

export function SetTheme(theme: Theme | undefined) {
  switch (theme as Theme | undefined) {
    case "light":
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
      break;
    case "dark":
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      break;
    default:
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      }
      localStorage.removeItem("theme");
      break;
  }
}

const selectedClassAdd =
  "outline outline-2 outline-primary z-[1] shadow-[0px_0px_5px_2px] shadow-primary";

function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState<Theme>(
    localStorage.theme || "system",
  );

  const handleSetTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    SetTheme(theme);
  };

  return (
    <div className="flex cursor-pointer select-none flex-row rounded-full">
      <div
        className={
          "rounded-l-full border border-black50 px-4 py-2 hover:border-black75 hover:bg-black25 dark:border-white25 dark:hover:border-white75 dark:hover:bg-white25" +
          " " +
          (currentTheme === "system" && selectedClassAdd)
        }
        onClick={() => handleSetTheme("system")}
      >
        System
      </div>
      <div
        className={
          "border border-black50 bg-white px-4 py-2 text-black hover:border-black75 hover:bg-black25" +
          " " +
          (currentTheme === "light" && selectedClassAdd)
        }
        onClick={() => handleSetTheme("light")}
      >
        Light
      </div>
      <div
        className={
          "rounded-r-full border border-black50 bg-black px-4 py-2 text-white hover:border-white75 hover:bg-white25" +
          " " +
          (currentTheme === "dark" && selectedClassAdd)
        }
        onClick={() => handleSetTheme("dark")}
      >
        Dark
      </div>
    </div>
  );
}

export default ThemeSelector;
