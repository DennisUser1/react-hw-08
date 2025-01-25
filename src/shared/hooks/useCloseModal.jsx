import { useEffect } from "react";

const useCloseModal = (onClose) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation(); 
      onClose();
    }
  };
  return { handleBackdropClick };
};

export default useCloseModal;
