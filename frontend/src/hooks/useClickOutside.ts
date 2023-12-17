import { type RefObject, useEffect, useCallback } from "react";

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  callback: () => unknown,
) => {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as T)) {
        callback();
      }
    },
    [ref, callback],
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);
};
