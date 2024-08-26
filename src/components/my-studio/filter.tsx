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
    <section className="mt-[12px] flex items-center gap-x-[16px] px-[16px] py-[8px]">
      <Link
        href={`${pathName}?type=portfolio`}
        className={cn(
          '',
          filter === 'portfolio' || filter === ''
            ? 'font-[500] text-[#201A17]'
            : 'text-[#B4ADA9]',
        )}
      >
        포트폴리오
      </Link>
      <Link
        href={`${pathName}?type=project`}
        className={cn(
          '',
          filter === 'project' ? 'font-[500] text-[#201A17]' : 'text-[#B4ADA9]',
        )}
      >
        프로젝트
      </Link>
      <Link
        href={`${pathName}?type=review`}
        className={cn(
          '',
          filter === 'review' ? 'font-[500] text-[#201A17]' : 'text-[#B4ADA9]',
        )}
      >
        리뷰
      </Link>
    </section>
  );
};

export default MySturioFilter;
