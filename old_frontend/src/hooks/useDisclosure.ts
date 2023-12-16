import {useCallback, useState} from "react";

export function useDisclosure(isOpenDefault = false) {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenDefault);

  const onOpen = useCallback(() => setIsOpen(true), []);

  const onClose = useCallback(() => setIsOpen(false), []);

  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {isOpen, onOpen, onClose, onToggle} as const;
}
