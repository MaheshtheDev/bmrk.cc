'use client';

import { groupByDate } from 'lib/data';
import { cn } from 'lib/utils';

import { BookmarkModified, Tag } from 'types/data';

import Card from './card';

type CardListProps = {
  bookmarks: BookmarkModified[];
  tags: Tag[];
};

export default function CardList({ bookmarks, tags }: CardListProps) {
  const data = groupByDate(bookmarks);

  return (
    <div className="h-full border-neutral-200 pb-24 dark:border-neutral-600">
      {Object.keys(data).map((dateKey: string) => {
        const bookmarksData = data[dateKey];
        return (
          <div
            className={cn(`flex flex-col w-full`, {
              'border-b border-neutral-200 dark:border-neutral-600':
                bookmarks.length > 0,
            })}
            key={dateKey}
          >
            {bookmarksData.map((bookmark: BookmarkModified) => (
              <Card key={bookmark.id} tags={tags} data={bookmark} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
