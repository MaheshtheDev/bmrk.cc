import CardSkeleton from 'components/card/skeleton';
import Header from 'components/header';

export default function Loading() {
  return (
    <>
      <Header headerText="Favorites" />
      <div className="min-h-dvh border-r border-neutral-200 dark:border-neutral-600">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton className="border-b border-neutral-200 dark:border-neutral-600" />
      </div>
    </>
  );
}
