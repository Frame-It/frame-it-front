'use client';

import { FilterTabs } from '@/components/common/filter-tabs';
import RecruitCard, {
  IRecruitCardProps,
} from '@/components/project/recruit-card';
import FilterDrawers from '@/components/project/recruitment/filter-drawers';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IRecruitFilter } from '@/lib/api/project/project-recruitment';
import { cn } from '@/lib/utils';
import { useRecruitStore } from '@/store/recruit-store';
import { ITabData } from '@/types/filter';
import { useEffect } from 'react';

interface RecruitClientProps {
  recruitList: IRecruitCardProps[];
  currentTab: string;
  tabsData: ITabData[];
  filter: IRecruitFilter;
}

const RecruitClient = ({
  recruitList,
  currentTab,
  tabsData,
  filter,
}: RecruitClientProps) => {
  const { recruits, setRecruits } = useRecruitStore();

  useEffect(() => {
    setRecruits(
      recruitList.map((recruit) => {
        const existingRecruit = recruits.find((r) => r.id === recruit.id);
        return existingRecruit ? existingRecruit : recruit;
      }),
    );
  }, [recruitList, setRecruits, currentTab, filter]);

  return (
    <div className={cn('relative h-full overflow-hidden xl:max-h-[650px]')}>
      <div className={cn('sticky z-10 bg-white')}>
        <FilterTabs tabsData={tabsData} currentTab={currentTab} />
        <div className={cn('h-[46px]')}>
          <FilterDrawers filter={filter} />
        </div>
      </div>
      <ScrollArea
        className={cn('h-[calc(100%-94px)] overflow-auto py-[19px] xl:py-0')}
      >
        <div className={cn('flex flex-col gap-[16px] px-[16px] xl:py-2')}>
          {recruits.map((recruit) => (
            <RecruitCard key={recruit.id} {...recruit} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecruitClient;
