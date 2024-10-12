'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import * as React from 'react';

interface IMySturioFilterProps {}

const MySturioFilter: React.FunctionComponent<IMySturioFilterProps> = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const filter = searchParams.get('type') || 'portfolio';

  return (
    <section className="mt-[12px] flex items-center gap-x-[16px] py-[8px]">
      <Link
        href={`${pathName}?type=portfolio`}
        className={cn(
          'text-base',
          filter === 'portfolio' || filter === ''
            ? 'font-[600] text-gray-10'
            : 'text-gray-60',
        )}
      >
        포트폴리오
      </Link>
      <Link
        href={`${pathName}?type=project`}
        className={cn(
          'text-base',
          filter === 'project' ? 'font-[600] text-gray-10' : 'text-gray-60',
        )}
      >
        프로젝트
      </Link>
      <Link
        href={`${pathName}?type=review`}
        className={cn(
          'text-base',
          filter === 'review' ? 'font-[600] text-gray-10' : 'text-gray-60',
        )}
      >
        리뷰
      </Link>
    </section>
  );
};

export default MySturioFilter;
