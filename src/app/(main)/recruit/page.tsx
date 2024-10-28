'use client';

import { FilterTabs } from '@/components/common/filter-tabs';
import RecruitCard from '@/components/project/recruit-card';
import FilterDrawers from '@/components/project/recruitment/filter-drawers';
import { useProjectRecruitmentsQuery } from '@/hooks/queries/projects/useRecruitmentsQuery';
import { IRecruitFilter } from '@/lib/api/project/project.interface';
import { cn } from '@/lib/utils';
import { ITabData, USER_TYPE } from '@/types/filter';
import {
  Identity,
  IRecruitProject,
  LocationType,
  TimeOption,
} from '@/types/project.type';

const RECRUIT = '구인';

const tabsData: ITabData[] = [
  {
    value: 'ALL',
    label: `${USER_TYPE.ALL}${RECRUIT}`,
    link: '/recruit?tab=all',
  },
  {
    value: 'MODEL',
    label: `${USER_TYPE.MODEL}${RECRUIT}`,
    link: '/recruit?tab=model',
  },
  {
    value: 'PHOTOGRAPHER',
    label: `${USER_TYPE.PHOTOGRAPHER}${RECRUIT}`,
    link: '/recruit?tab=photographer',
  },
];

interface RecruitPageProps {
  searchParams: {
    tab?: string;
    startDate?: string;
    endDate?: string;
    timeOption?: string;
    locationType?: string;
    concepts?: string;
    spot?: string;
  };
}

const RecruitPage = ({ searchParams }: RecruitPageProps) => {
  const filter: IRecruitFilter = {
    recruitmentRole:
      searchParams.tab === 'all' ? undefined : (searchParams.tab as Identity),
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
    timeOption: searchParams.timeOption as TimeOption,
    locationType: searchParams.locationType as LocationType,
    concepts: searchParams.concepts?.split('+'),
    spot: searchParams.spot,
  };

  const currentTab = searchParams.tab ?? 'all';
  const {
    data: recruitList,
    isLoading,
    isError,
  } = useProjectRecruitmentsQuery(filter);

  if (isError) {
    return <div>Failed to load recruit announcements</div>;
  }

  return (
    <div className={cn('relative h-full overflow-hidden')}>
      <div className={cn('sticky z-10 bg-white')}>
        <FilterTabs tabsData={tabsData} currentTab={currentTab} />
        <div className={cn('h-[46px]')}>
          <FilterDrawers filter={filter} />
        </div>
      </div>
      <div className={cn('h-[calc(100%-94px)] overflow-auto py-[19px]')}>
        <div className={cn('flex flex-col gap-[16px] px-[16px]')}>
          {isLoading && <div>Loading...</div>}
          {recruitList?.map((recruit: IRecruitProject) => (
            <RecruitCard key={recruit.id} {...recruit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruitPage;
