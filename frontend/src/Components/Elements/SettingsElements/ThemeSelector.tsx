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
    <div className="flex cursor-pointer select-none flex-row rounded-full border border-black50">
      <div
        className={
          "rounded-l-full border-r border-black25 px-4 py-2 dark:border-white25" +
          " " +
          (currentTheme === "system" && selectedClassAdd)
        }
        onClick={() => handleSetTheme("system")}
      >
        System
      </div>
      <div
        className={
          "border-black25 bg-white px-4 py-2 text-black dark:border-white25" +
          " " +
          (currentTheme === "light" && selectedClassAdd)
        }
        onClick={() => handleSetTheme("light")}
      >
        Light
      </div>
      <div
        className={
          "rounded-r-full border-l border-black25 bg-black px-4 py-2 text-white dark:border-white25" +
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
