import { cn } from 'lib/utils';

export default function SettingsCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'border h-fit border-neutral-300 dark:border-neutral-600 justify-between rounded-lg flex gap-4 items-center',
        className,
      )}
    >
      {children}
    </div>
  );
}
