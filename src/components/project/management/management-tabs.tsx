'use client';

import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

interface IManagementTabsProps {}

const ManagementTabs: React.FunctionComponent<IManagementTabsProps> = () => {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const filter = searchParams.get('type') || 'all';

  const tabs = [
    { label: '전체', type: 'all' },
    { label: '모집중', type: 'recruiting' },
    { label: '진행중', type: 'progress' },
    { label: '완료', type: 'completed' },
    { label: '취소', type: 'cancelled' },
  ];

  const handleTabClick = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', type);
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <section className="flex items-center gap-4 px-6 py-2">
      {tabs.map((tab) => (
        <button
          key={tab.type}
          onClick={() => handleTabClick(tab.type)}
          className={cn(
            'font-body-14m',
            filter === tab.type ? 'text-gray-10' : 'text-gray-60',
          )}
        >
          {tab.label}
        </button>
      ))}
    </section>
  );
};

export default ManagementTabs;
