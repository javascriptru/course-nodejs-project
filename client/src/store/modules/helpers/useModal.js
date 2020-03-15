import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleModal() {
    setIsOpen(!isOpen);
  }

  return {
    isOpen,
    handleToggleModal,
  }
};

export default useModal;