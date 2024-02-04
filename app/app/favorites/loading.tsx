import CardSkeleton from 'components/card/skeleton';
import Header from 'components/header';

export default function Loading() {
  return (
    <>
      <Header headerText="Favorites" />
      <div className="min-h-dvh border-r border-border">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton className="border-b border-border" />
      </div>
    </>
  );
}
