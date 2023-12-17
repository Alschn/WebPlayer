import { useCallback, useEffect, useMemo, useState } from "react";

interface UseSelectRowProps<T> {
  onClick?: (item: T) => void;
  onDoubleClick?: (item: T) => void;
  delay?: number;
}

export const useSelectRow = <T>({
  onClick,
  onDoubleClick,
  delay,
}: UseSelectRowProps<T>) => {
  const [clicks, setClicks] = useState(0);
  const [selected, setSelected] = useState<T | null>(null);

  useEffect(() => {
    if (!selected || clicks === 0) return;

    const timer = setTimeout(() => {
      if (clicks === 1) onClick?.(selected);
      setClicks(0);
    }, delay ?? 250);

    if (clicks === 2) onDoubleClick?.(selected);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clicks, delay, selected]);

  const handleClick = useCallback((item: T) => {
    setSelected(item);
    setClicks((prev) => prev + 1);
  }, []);

  const resetSelected = useCallback(() => {
    setSelected(null);
  }, []);

  return useMemo(
    () => ({
      selected: selected,
      resetSelected,
      handleClick,
    }),
    [selected, resetSelected, handleClick],
  );
};
