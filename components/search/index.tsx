'use client';

import { useState } from 'react';

import { SearchIcon } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';

import { useAuth } from 'components/context/auth';
import SignupModal from 'components/modal/signup';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

import { cn } from 'lib/utils';

import SearchCommand from './command';

export default function Search({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  useHotkeys(
    ['k'],
    (_, handler) => {
      const keys = handler.keys?.join('');
      if (keys === 'k') setOpen(true);
    },
    { keyup: true },
  );

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'p-2.5 inline-block rounded-xl group transition-all text-center hover:bg-neutral-200 dark:hover:bg-accent',
          className,
        )}
      >
        <Tooltip>
          <TooltipTrigger className="text-neutral-900" asChild>
            <SearchIcon className="w-6 h-6 text-black dark:text-white group group-hover:scale-95 duration-150 transition-transform" />
          </TooltipTrigger>
          <TooltipContent side={'right'} className="flex items-center ml-4">
            Search{' '}
            <kbd className="pointer-events-none ml-2 border border-white inline-flex h-4 select-none items-center gap-1 rounded  px-1 font-mono text-[10px] font-medium text-white opacity-100">
              K
            </kbd>
          </TooltipContent>
        </Tooltip>
      </button>

      {open ? (
        user ? (
          <SearchCommand open={true} setOpen={setOpen} />
        ) : (
          <SignupModal open={true} onHide={setOpen} />
        )
      ) : null}
    </>
  );
}
