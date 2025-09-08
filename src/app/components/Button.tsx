import React, { FC, PropsWithChildren, ButtonHTMLAttributes } from 'react';
import FadeLoader from './FadeLoader';

interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  loading?: boolean;
  variant?: 'default' | 'text';
}

const Button: FC<ButtonProps> = ({ children, loading = false, disabled, variant = 'default', ...rest }) => {
  const isDisabled = loading || disabled;

  const baseClasses = variant === 'text'
    ? `text-violet-700 dark:text-violet-400 py-2
       hover:underline focus:outline-none transition-all flex items-center justify-center
       text-sm sm:text-base md:text-lg lg:text-xl`
    : `
      bg-violet-700 text-white w-full
      rounded-xl
      flex items-center justify-center
      transition-all
      hover:bg-violet-500 focus:bg-violet-950
      text-lg sm:text-xl md:text-2xl lg:text-3xl
      py-2 sm:py-3 md:py-4
      h-10 sm:h-12 md:h-14 lg:h-16
    `;

  const disabledClasses = variant === 'text'
    ? `text-gray-400 cursor-not-allowed opacity-70`
    : `disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed
       ${loading ? 'cursor-not-allowed opacity-70' : ''}`;

  const buttonClasses = `${baseClasses} ${isDisabled ? disabledClasses : (variant !== 'text' ? 'cursor-pointer' : '')}`;

  return (
    <button
      disabled={isDisabled}
      className={buttonClasses}
      {...rest}
    >
      {loading ? <FadeLoader size={10} color={variant === 'text' ? 'currentColor' : 'white'} gap={6} /> : children}
    </button>
  );
};

export default Button;
