import { useCallback, useState } from "react";

export default function useModalState() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const updateModalState = useCallback((state: boolean) => setIsOpen(state), []);


  return { isOpen, openModal, closeModal, updateModalState };
}