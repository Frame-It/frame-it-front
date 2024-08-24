'use client';

import { FilterTabs } from '@/components/common/filter-tabs';
import RecruitCard from '@/components/recruit/recruit-card';
import { cn } from '@/lib/utils';
import { USER_TYPE, UserValue } from '@/types/filter';

interface ITabData {
  value: UserValue;
  label: string;
}

const RECRUIT = '구인';

const tabsData: ITabData[] = [
  { value: 'ALL', label: `${USER_TYPE.ALL}${RECRUIT}` },
  { value: 'MODEL', label: `${USER_TYPE.MODEL}${RECRUIT}` },
  { value: 'PHOTOGRAPHER', label: `${USER_TYPE.PHOTOGRAPHER}${RECRUIT}` },
];

const RecruitPage = () => {
  const handleChange = (value: string) => {
    console.log('handleChange', value);
  };

  return (
    <div className={cn('relative h-[calc(100vh-122px)] overflow-hidden')}>
      <div className={cn('sticky z-10 bg-white')}>
        <FilterTabs
          defaultValue="ALL"
          onValueChange={handleChange}
          tabsData={tabsData}
        />
        <div className={cn('h-[46px]')}>기타 필터</div>
      </div>
      <div className={cn('h-[calc(100%-94px)] overflow-auto py-[19px]')}>
        <div className={cn('flex flex-col gap-[16px] px-[16px]')}>
          <RecruitCard />
          <RecruitCard />
          <RecruitCard />
          <RecruitCard />
          <RecruitCard />
          <RecruitCard />
          <RecruitCard />
        </div>
      </div>
    </div>
  );
};

export default RecruitPage;
