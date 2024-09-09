'use client';

import { FilterTabs } from '@/components/common/filter-tabs';
import FeedList from '@/components/feed/feed-list';
import { USER_TYPE, UserValue } from '@/types/filter';
import { useEffect, useState } from 'react';

interface ITabData {
  value: UserValue;
  label: string;
}

const tabsData: ITabData[] = [
  { value: 'ALL', label: `${USER_TYPE.ALL}` },
  { value: 'MODEL', label: `${USER_TYPE.MODEL}` },
  { value: 'PHOTOGRAPHER', label: `${USER_TYPE.PHOTOGRAPHER}` },
];

export default function FeedPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (value: string) => {
    console.log('handleChange', value);
  };

  if (!isMounted) return null;

  return (
    <>
      <FilterTabs
        defaultValue="ALL"
        onValueChange={handleChange}
        tabsData={tabsData}
      />
      <div className="h-[calc(100dvh-58px-63px-48px)] overflow-y-auto px-[16px] pb-2">
        <FeedList />
      </div>
    </>
  );
}
