import React, { FC, InputHTMLAttributes, PropsWithChildren } from 'react';

interface InputProps extends PropsWithChildren<InputHTMLAttributes<HTMLInputElement>> {
  label?: string;
  error?: string;
  className?: string;
}

const Input: FC<InputProps> = ({ label, error, className = '', ...rest }) => {
  const baseClasses = `
    px-4 py-2 sm:py-3 md:py-4 border rounded-lg
    text-violet-700 border-neutral-400 placeholder:text-neutral-600
    focus:outline-none disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:border-0
    text-sm sm:text-base md:text-lg lg:text-xl
    sm:h-12 md:h-14 lg:h-14
    w-full
  `;

  const errorClasses = `
    border-red-700 focus:ring-red-700 focus:border-red-700 focus:!bg-red-50
  `;

  const labelClasses = `
    mb-1 me-2 
    ${error ? 'text-red-700' : 'text-neutral-900'}
    text-sm sm:text-base md:text-lg lg:text-xl
  `;

  const errorTextClasses = 'mt-1 me-2 text-sm sm:text-xs md:text-md lg:text-lg text-red-700';

  return (
    <div className="flex flex-col w-full">
      {label && <label className={labelClasses}>{label}</label>}
      <input
        className={`${baseClasses} ${error ? errorClasses : ''} ${className}`}
        {...rest}
      />
      {error && <p className={errorTextClasses}>{error}</p>}
    </div>
  );
};

export default Input;
