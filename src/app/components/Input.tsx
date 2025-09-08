import React, { FC, InputHTMLAttributes, PropsWithChildren } from 'react';

interface InputProps extends PropsWithChildren<InputHTMLAttributes<HTMLInputElement>> {
  label?: string;
  error?: string;
}

const inputClasses = {
  base: `
    px-4 py-4 border rounded-lg text-violet-700 border-neutral-400 placeholder:text-neutral-600
    focus:outline-none disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:border-0
    text-sm sm:text-base md:text-lg lg:text-xl h-10 sm:h-12 md:h-14 lg:h-16
  `,
  error: `
    border-red-700 focus:ring-red-700 focus:border-red-700 focus:!bg-red-50
  `,
  label: {
    base: 'mb-1 ms-2 font-medium text-neutral-900',
    error: 'text-red-700'
  },
  errorText: 'mt-1 ms-2 text-sm text-red-700'
};

const Input: FC<InputProps> = ({ label, error, className = '', ...rest }) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className={`${inputClasses.label.base} ${error ? inputClasses.label.error : ''}`}>
          {label}
        </label>
      )}
      <input
        className={`${inputClasses.base} ${error ? inputClasses.error : ''} ${className}`}
        {...rest}
      />
      {error && <p className={inputClasses.errorText}>{error}</p>}
    </div>
  );
};

export default Input;
