'use client';

import { FilterTabs } from '@/components/common/filter-tabs';
import RecruitCard, {
  IRecruitCardProps,
} from '@/components/project/recruit-card';
import FilterDrawers from '@/components/project/recruitment/filter-drawers';
import { cn } from '@/lib/utils';
import { useRecruitStore } from '@/store/recruit-store';
import { ITabData } from '@/types/filter';
import { useEffect } from 'react';

interface RecruitClientProps {
  recruitList: IRecruitCardProps[];
  currentTab: string;
  tabsData: ITabData[];
}

const RecruitClient = ({
  recruitList,
  currentTab,
  tabsData,
}: RecruitClientProps) => {
  const { recruits, setRecruits } = useRecruitStore();

  useEffect(() => {
    setRecruits(
      recruitList.map((recruit) => {
        const existingRecruit = recruits.find((r) => r.id === recruit.id);
        return existingRecruit ? existingRecruit : recruit;
      }),
    );
  }, [recruitList, setRecruits, currentTab]);

  return (
    <div className={cn('relative h-[calc(100vh-122px)] overflow-hidden')}>
      <div className={cn('sticky z-10 bg-white')}>
        <FilterTabs tabsData={tabsData} currentTab={currentTab} />
        <div className={cn('h-[46px]')}>
          <FilterDrawers />
        </div>
      </div>
      <div className={cn('h-[calc(100%-94px)] overflow-auto py-[19px]')}>
        <div className={cn('flex flex-col gap-[16px] px-[16px]')}>
          {recruits.map((recruit) => (
            <RecruitCard key={recruit.id} {...recruit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruitClient;
