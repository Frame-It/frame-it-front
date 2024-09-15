'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import * as React from 'react';

interface IManagementTabsProps {}

const ManagementTabs: React.FunctionComponent<IManagementTabsProps> = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const filter = searchParams.get('type') || 'all';

  const tabs = [
    { label: '전체', type: 'all' },
    { label: '모집중', type: 'recruiting' },
    { label: '진행중', type: 'progress' },
    { label: '완료', type: 'completed' },
    { label: '취소', type: 'cancelled' },
  ];

  return (
    <section className="flex items-center gap-4 px-6 py-2">
      {tabs.map((tab) => (
        <Link
          key={tab.type}
          href={`${pathName}?type=${tab.type}`}
          className={cn(
            'font-body-14m',
            filter === tab.type ? 'text-gray-10' : 'text-gray-60',
          )}
        >
          {tab.label}
        </Link>
      ))}
    </section>
  );
};

export default ManagementTabs;
