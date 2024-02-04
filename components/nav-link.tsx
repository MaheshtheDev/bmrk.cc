'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

import { cn } from 'lib/utils';

type NavLinkProps = {
  children: React.ReactNode;
  href: string;
  title: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  target?: 'external';
};

export default function NavLink(props: NavLinkProps) {
  const {
    children,
    href,
    title,
    side = 'right',
    className = '',
    target,
  } = props;
  const pathname = usePathname();

  if (target === 'external') {
    return (
      <a
        href={href}
        className={cn(
          `p-2 inline-block max-md:p-3 rounded-xl group transition-colors text-center text-neutral-900 hover:bg-neutral-200 dark:hover:bg-accent`,
          {
            'bg-neutral-200 dark:bg-accent': pathname === href,
          },
          className,
        )}
      >
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent className="ml-4" side={side}>
            {title}
          </TooltipContent>
        </Tooltip>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        `p-2 inline-block max-md:p-3 rounded-xl group transition-colors text-center text-neutral-900 hover:bg-neutral-200 dark:hover:bg-accent`,
        {
          'bg-neutral-200 dark:bg-accent': pathname === href,
        },
        className,
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="ml-4" side={side}>
          {title}
        </TooltipContent>
      </Tooltip>
    </Link>
  );
}
