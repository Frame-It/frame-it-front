'use client';

import BottomButton from '@/components/common/bottom-button';
import { FilterTabs } from '@/components/common/filter-tabs';
import Icon from '@/components/common/icon';
import LoadingSpinner from '@/components/common/loading-spinner';
import RecruitCard from '@/components/project/recruit-card';
import FilterDrawers from '@/components/project/recruitment/filter-drawers';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { useRouter } from 'next/navigation';

const RECRUIT = '구인';

const tabsData: ITabData[] = [
  {
    value: 'ALL',
    label: `${USER_TYPE.ALL}`,
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
  const router = useRouter();
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
    <div className={cn('relative flex h-full flex-col overflow-hidden')}>
      <div className={cn('sticky z-10 bg-white')}>
        <FilterTabs tabsData={tabsData} currentTab={currentTab} />
        <div className={cn('h-[46px]')}>
          <FilterDrawers filter={filter} />
        </div>
      </div>

      {recruitList?.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-[9px] text-center">
          <Icon id={'pictogram-icon'} width={87} height={71} stroke="#7E7774" />
          <div>
            <div className="font-title-16 whitespace-pre-line text-gray-20">
              {'나의 작업메이트를\n찾아볼까요?'}
            </div>
          </div>
          <BottomButton
            variant={'secondary'}
            size={'middle'}
            label={'프로젝트 등록 하기'}
            className="w-fit px-6"
            onClick={() => router.push('/project-register')}
          />
        </div>
      ) : (
        <>
          {isLoading ? (
            <div className="flex h-full justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <ScrollArea
              className={cn(
                'h-[calc(100%-94px)] overflow-auto py-[19px] xl:h-[calc(800px-94px-24px-120px)]',
              )}
            >
              <div className={cn('flex h-full flex-col gap-[16px] px-[16px]')}>
                {recruitList?.map((recruit: IRecruitProject) => (
                  <RecruitCard key={recruit.id} {...recruit} />
                ))}
              </div>
            </ScrollArea>
          )}
        </>
      )}
    </div>
  );
};

export default RecruitPage;
