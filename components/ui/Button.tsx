import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'ghost' | 'whatsapp';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  primary: [
    'bg-[var(--green)] text-[var(--bg)] font-semibold',
    'hover:bg-[var(--green-dim)]',
    'shadow-[0_0_24px_var(--green-glow)]',
    'hover:shadow-[0_0_36px_var(--green-glow)]',
    'transition-all duration-200',
  ].join(' '),

  ghost: [
    'bg-transparent text-[var(--green)] font-medium',
    'border border-[var(--border)]',
    'hover:border-[var(--green)] hover:bg-[var(--green-glow)]',
    'transition-all duration-200',
  ].join(' '),

  whatsapp: [
    'bg-[#25D366] text-white font-semibold',
    'hover:bg-[#1ebe5c]',
    'shadow-[0_0_20px_rgba(37,211,102,0.25)]',
    'hover:shadow-[0_0_30px_rgba(37,211,102,0.35)]',
    'transition-all duration-200',
  ].join(' '),
};

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center gap-2',
        'rounded-full px-6 py-3 text-sm',
        'cursor-pointer select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}
