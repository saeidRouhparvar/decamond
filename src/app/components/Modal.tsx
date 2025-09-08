'use client'

import React, { FC, ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 p-6 relative"
        onClick={(e) => e.stopPropagation()} 
      >
        {title && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
                X
            </button>
          </div>
        )}

        <div className="text-gray-700 dark:text-gray-200">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
