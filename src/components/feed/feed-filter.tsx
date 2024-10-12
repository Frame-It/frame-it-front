'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const FeedFilter = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const filter = searchParams.get('role') || 'all';
  return (
    <div className="sticky flex w-full items-center justify-between gap-x-4 px-6 py-2">
      <div className="flex gap-x-4">
        <Link
          href={`${pathName}?role=all`}
          className={cn(
            'text-base',
            filter === 'all' ? 'font-[600] text-primary' : 'text-gray-60',
          )}
        >
          전체
        </Link>
        <Link
          href={`${pathName}?role=model`}
          className={cn(
            'text-base',
            filter === 'model' ? 'font-[600] text-primary' : 'text-gray-60',
          )}
        >
          모델
        </Link>
        <Link
          href={`${pathName}?role=author`}
          className={cn(
            'text-base',
            filter === 'author' ? 'font-[600] text-primary' : 'text-gray-60',
          )}
        >
          작가
        </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="font-body-14 flex items-center text-gray-20">
          <div>최신 순</div>
          <ChevronDown className="size-[20px] text-gray-20" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-body-14 min-w-[69px] p-2">
          <DropdownMenuItem className="p-2">최신 순</DropdownMenuItem>
          <DropdownMenuItem className="p-2">조회 순</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FeedFilter;
