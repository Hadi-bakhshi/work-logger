// import { useMemo } from "react";
import { FilterIconRender } from "./IconsUtil";

// Function for renderind customize icon for filter
export const icons = {
  menu: () => {
    return FilterIconRender();
  },
};

// export const icons = useMemo(() => {
//   return {
//     menu: () => {
//       return FilterIconRender();
//     },
//   };
// }, []);
