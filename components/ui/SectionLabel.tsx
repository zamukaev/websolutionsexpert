interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className="block h-px w-8 bg-[var(--green)]"
        aria-hidden="true"
      />
      <span
        className={[
          'text-[var(--green)] text-xs font-semibold uppercase tracking-[0.18em]',
          'font-[family-name:var(--font-unbounded)]',
        ].join(' ')}
      >
        {children}
      </span>
    </div>
  );
}
