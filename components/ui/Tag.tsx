interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={[
        'inline-flex items-center',
        'rounded-full border border-[var(--border)]',
        'px-3 py-1',
        'text-[var(--green)] text-xs font-medium',
        'bg-[var(--green-glow)]',
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
