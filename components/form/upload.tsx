'use client';

import { SyntheticEvent, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { QuestionMarkCircledIcon } from '@radix-ui/react-icons';
import { ArrowUpCircle } from 'lucide-react';
import { toast } from 'sonner';

import { useUser } from 'components/context/user';
import Loader from 'components/loader';
import { Input } from 'components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip';

import { checkBookmarkLimit } from 'lib/data';
import { cn, getBrowserName } from 'lib/utils';

type UploadModalProps = {
  onHide?: (open: boolean) => void;
  SubmitBtn?: React.FC<{ children: React.ReactNode; disabled: boolean }>;
};

const helpLinks: { [key: string]: string } = {
  chrome: 'https://support.google.com/chrome/answer/96816?hl=en',
  safari:
    'https://www.idownloadblog.com/2016/10/17/exporting-safari-bookmarks-from-iphone-ipad-mac-pc/',
  firefox:
    'https://support.mozilla.org/en-US/kb/export-firefox-bookmarks-to-backup-or-transfer',
};

export default function UploadForm({ onHide, SubmitBtn }: UploadModalProps) {
  const { user, currentPlan } = useUser();
  const [loading, setLoading] = useState(false);
  const [fileDetails, setFileDetails] = useState({ name: '', size: 0 });
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const createBookmarks = async (content: string | ArrayBuffer | null) => {
    if (!content) {
      toast.error('Error occurred, try again');
    }
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message);
      }
      onHide?.(false);
      toast.success('Bookmarks created successfully.');
      if (SubmitBtn) {
        router.replace('/');
      } else {
        router.refresh();
      }
    } catch (error) {
      toast.error((error as Error)?.message);
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = ({ target }: { target: HTMLInputElement }) => {
    const files = target?.files ?? [];
    if (files && files.length) {
      const file = files[0];
      if (file) {
        setFileDetails({ name: file.name, size: file.size });
      }
    }
  };

  const onSubmit = () => {
    try {
      const files = hiddenInputRef.current?.files ?? [];
      if (files && files.length && isFileAllowed) {
        const file = files[0];
        if (file) {
          if (checkBookmarkLimit(user, [])) {
            toast.error(`Bookmarks limit reached! Upgrade to pro plan.`);
            return;
          }
          toast.info(`Don't refresh this page.`, {
            duration: 5000,
          });
          setLoading(true);
          const reader = new FileReader();
          reader.readAsText(file);
          reader.onload = async function () {
            const content = reader.result;
            await createBookmarks(content);
          };
        }
      }
    } catch {
      toast.error('Error occurred, try again');
    }
  };

  const allowedSize = 200;
  const fileSize = Math.ceil(fileDetails.size / 1024);
  const isFileAllowed = fileSize <= allowedSize;

  return (
    <form
      className="flex flex-col w-full"
      onSubmit={(event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="relative h-48 border border-neutral-300 dark:border-neutral-600 border-dashed rounded-lg">
        <Input
          className="opacity-0"
          type="file"
          accept=".html"
          ref={hiddenInputRef}
          onChange={onFileChange}
        />
        <button
          type="button"
          onClick={() => {
            hiddenInputRef.current?.click();
          }}
          className="flex w-full -mt-3 justify-center flex-col items-center"
        >
          <ArrowUpCircle strokeWidth={1} className="w-10 h-10" />
          <p className="text-sm mt-2 font-medium">Click to browse</p>
        </button>
        <div className="text-sm flex flex-col mt-2 text-muted-foreground text-center">
          {fileDetails.name?.length ? (
            <>
              <span className="text-primary">{fileDetails.name}</span>
              <span className="text-xs mt-1.5 text-muted-foreground">
                File Size:{' '}
                <span
                  className={cn(`font-medium`, {
                    'text-red-600': !isFileAllowed,
                  })}
                >
                  {!isFileAllowed ? 'Greater than 200 KB' : fileSize + ' KB'}
                </span>
              </span>
            </>
          ) : (
            <>
              <span>
                {' '}
                Export your bookmarks from your browser.
                <Tooltip>
                  <TooltipTrigger
                    onClick={(event) => {
                      event.stopPropagation();
                      const name = getBrowserName();
                      const link = helpLinks[name] ?? helpLinks['chrome'];
                      window.open(link, '_blank');
                    }}
                  >
                    <QuestionMarkCircledIcon className="w-3.5 relative -top-0.5 h-3.5 text-blue-700 " />
                  </TooltipTrigger>
                  <TooltipContent className="text-white dark:text-black">
                    Click to know how.
                  </TooltipContent>
                </Tooltip>
              </span>
              <span className="text-xs mt-1.5 text-muted-foreground">
                Max File Size: <span className="font-medium">200 KB</span>
              </span>
            </>
          )}
        </div>
      </div>
      {!SubmitBtn ? (
        <div className="flex w-full justify-end mt-3 mb-1">
          <button
            type="submit"
            disabled={loading || !fileDetails.name?.length || !isFileAllowed}
            className={cn(
              `rounded-full w-[86px] h-[40px] transition-colors items-center bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-700 disabled:opacity-40 disabled:active:bg-blue-600 disabled:hover:bg-blue-600 disabled:focus:bg-blue-600 border-0 flex justify-center py-2 px-4 text-white`,
              {
                '!opacity-50 cursor-not-allowed': loading,
              },
            )}
          >
            {loading ? <Loader /> : 'Submit'}
          </button>
        </div>
      ) : (
        <div className="flex w-full justify-center">
          <SubmitBtn
            disabled={loading || !fileDetails.name?.length || !isFileAllowed}
          >
            {loading ? (
              <>
                <Loader className="mr-2" /> Submit
              </>
            ) : (
              'Submit'
            )}
          </SubmitBtn>
        </div>
      )}
    </form>
  );
}
