import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      {/* Modal Content */}
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
