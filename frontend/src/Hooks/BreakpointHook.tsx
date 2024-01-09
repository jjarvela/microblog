import { useMediaQuery } from "react-responsive";
import resolveConfig from "tailwindcss/resolveConfig.js";

import tailwindConfig from "../../tailwind.config.js";

const config = resolveConfig(tailwindConfig);
const breakpoints = config.theme.screens;

type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
  const bool = useMediaQuery({
    query: `(min-width: ${breakpoints[breakpointKey]})`,
  });
  const capitalizedKey =
    breakpointKey[0].toUpperCase() + breakpointKey.substring(1);
  type Key = `is${Capitalize<K>}`;
  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}

/*
Code based on these:
https://stackoverflow.com/a/71098593
https://github.com/kodingdotninja/use-tailwind-breakpoint // Didn't use this since apparently broken and not updated since 2021.
*/
