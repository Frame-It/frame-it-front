'use client';

import { FilterTabs } from '@/components/common/filter-tabs';
import FeedList from '@/components/feed/feed-list';
import { USER_TYPE, UserValue } from '@/types/filter';

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
  const handleChange = (value: string) => {
    console.log('handleChange', value);
  };
  return (
    <div className="px-[16px] py-[1px]">
      <FilterTabs
        defaultValue="ALL"
        onValueChange={handleChange}
        tabsData={tabsData}
      />
      <FeedList />
    </div>
  );
}
