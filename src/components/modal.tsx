import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full h-full max-w-lg max-h-screen overflow-y-auto p-6 rounded-lg md:max-w-lg md:h-auto md:rounded-lg md:inset-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✖️
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
