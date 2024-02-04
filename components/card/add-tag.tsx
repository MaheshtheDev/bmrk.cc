import { useState } from 'react';

import { Tags } from 'lucide-react';

import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';

import { cn } from 'lib/utils';

import { BookmarkModified, Tag } from 'types/data';

import TagList from './tag-list';

type AddTagProps = {
  data: BookmarkModified;
  tags: Tag[];
};

export default function AddTag({ data, tags }: AddTagProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover
      onOpenChange={(isOpen: boolean) => {
        setOpen(isOpen);
      }}
    >
      <PopoverTrigger asChild>
        <button
          className={cn(
            `flex items-center transition-colors -ml-1.5 justify-center gap-1 rounded-full shrink-0 w-9 h-9 hover:bg-blue-100 active:bg-blue-100 dark:hover:bg-blue-200 dark:active:bg-blue-200`,
            { '!opacity-100': open },
          )}
        >
          <Tags className="w-4 h-4 text-blue-500 dark:text-blue-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-52 bg-white rounded-lg shadow-2xl p-0 dark:bg-popover">
        <TagList tags={tags} data={data} />
      </PopoverContent>
    </Popover>
  );
}
