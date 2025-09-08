import React, { FC, PropsWithChildren, ButtonHTMLAttributes } from 'react';
import FadeLoader from './FadeLoader';

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  loading?: boolean;
  variant?: 'default' | 'text' | 'outline';
}

const Button: FC<ButtonProps> = ({ children, loading = false, disabled, variant = 'default', ...rest }) => {
  const isDisabled = loading || disabled;

  const baseClasses = variant === 'text'
    ? `text-violet-700 py-2
       focus:outline-none transition-all flex items-center justify-center
       sm:text-md md:text-lg lg:text-xl cursor-pointer`
    : variant === 'outline'
      ? `
      border-2 border-violet-700 text-violet-700
      bg-transparent
      rounded-xl px-4
      flex items-center justify-center
      transition-all
      hover:bg-violet-50 focus:bg-violet-100
      sm:text-md md:text-lg lg:text-xl
      py-2 sm:py-3 md:py-4
      sm:h-10 md:h-12 lg:h-14
      cursor-pointer
    `
      : `
      bg-violet-700 text-white w-full
      rounded-xl px-4
      flex items-center justify-center
      transition-all
      hover:bg-violet-500 focus:bg-violet-950
      sm:text-md md:text-lg lg:text-xl
      py-2 sm:py-3 md:py-4
      sm:h-10 md:h-12 lg:h-14
      cursor-pointer
    `;

  const disabledClasses = variant === 'text'
    ? `text-gray-400 cursor-not-allowed opacity-70`
    : variant === 'outline'
      ? `border-gray-300 text-gray-400 cursor-not-allowed opacity-70`
      : `disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed
       ${loading ? 'cursor-not-allowed opacity-70' : ''}`;

  const buttonClasses = `${baseClasses} ${isDisabled ? disabledClasses : ''}`;

  return (
    <button
      disabled={isDisabled}
      className={buttonClasses}
      {...rest}
    >
      {loading ? <FadeLoader size={10} color={variant === 'text' || variant === 'outline' ? 'currentColor' : 'white'} gap={6} /> : children}
    </button>
  );
};

export default Button;
