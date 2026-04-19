import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const variantClassMap: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white border border-brand hover:bg-[#1A1C19] hover:border-[#1A1C19] shadow-lg shadow-brand/15',
  secondary:
    'bg-[#1A1C19] text-white border border-[#1A1C19] hover:bg-brand hover:border-brand shadow-lg shadow-[#1A1C19]/15',
  outline:
    'bg-transparent text-[#1A1C19] border border-[#1A1C19]/20 hover:bg-[#1A1C19] hover:text-white hover:border-[#1A1C19]',
  ghost: 'bg-transparent text-[#1A1C19]/80 border border-transparent hover:text-brand',
};

const sizeClassMap: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-[9px] tracking-[0.28em]',
  md: 'px-8 py-3.5 text-[10px] tracking-[0.3em]',
  lg: 'px-10 py-4.5 text-[10px] tracking-[0.34em]',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-3 rounded-full font-bold uppercase transition-all duration-500 ease-[var(--ease-out)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40 ${variantClassMap[variant]} ${sizeClassMap[size]} ${className}`}
      {...props}
    />
  );
};

export default Button;
