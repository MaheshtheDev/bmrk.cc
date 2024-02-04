import Link from 'next/link';

import { getBookmarks } from 'app/actions/bookmarks';
import { getTags, getTagsWithBookmarkIds } from 'app/actions/tags';

import CardList from 'components/card-list';
import Header from 'components/header';
import DeleteTag from 'components/tag/delete-tag';
import EditTag from 'components/tag/edit-tag';
import { Badge } from 'components/ui/badge';

const title = 'Bookmark it. | Tags';
const description = 'Bookmark manager for the modern web.';

export const metadata = {
  title,
  description,
};

export default async function Page() {
  const [bookmarks, tags, groupedByTagId] = await Promise.all([
    await getBookmarks(),
    await getTags(),
    await getTagsWithBookmarkIds(),
  ]);

  return (
    <>
      <Header headerText="Tags" />
      <div className="min-h-dvh border-r border-neutral-200 pb-24 dark:border-neutral-600">
        {tags.length ? (
          <>
            <div className="flex gap-x-3 gap-y-2 items-end px-4 max-h-[5.25rem] overflow-y-scroll scrollbar flex-wrap py-3 border-b border-neutral-200 dark:border-neutral-600">
              {tags.map(({ id, name }) => (
                <div key={id} className="inline-flex items-center">
                  <Link className="flex items-center" href={`/tags/${name}`}>
                    <Badge className="font-normal py-1.5" variant="secondary">
                      {name} ({groupedByTagId[id]?.length ?? 0})
                    </Badge>
                  </Link>
                  <EditTag id={id} name={name} />
                  <DeleteTag id={id} />
                </div>
              ))}
            </div>
          </>
        ) : null}
        <CardList bookmarks={bookmarks} tags={tags} />
      </div>
    </>
  );
}
