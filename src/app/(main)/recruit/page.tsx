import { FilterTabs } from '@/components/common/filter-tabs';
import FilterDrawers from '@/components/project/filter-drawers';
import RecruitCard, {
  IRecruitCardProps,
} from '@/components/project/recruit-card';
import { IRecruitResponse, getRecruitAnnouncements } from '@/lib/api/project';
import { cn } from '@/lib/utils';
import { USER_TYPE, UserValue } from '@/types/filter';

interface ITabData {
  value: UserValue;
  label: string;
  link: string;
}

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

const RecruitPage = async ({
  searchParams,
}: {
  searchParams: { tab?: string };
}) => {
  const query =
    searchParams.tab && searchParams.tab !== 'all' ? searchParams.tab : '';

  const fetchedData = await getRecruitAnnouncements(
    query as IRecruitResponse['recruitmentRole'],
  );

  const recruitList: IRecruitCardProps[] = fetchedData.map(
    (item: IRecruitResponse) => ({
      id: item.id,
      imageUrl: item.previewImageUrl,
      type: item.recruitmentRole,
      title: item.title,
      location: item.spot,
      date: new Date(item.shootingAt).toDateString(),
      tagList: item.concepts,
      isBookmarked: item.isBookmarked,
    }),
  );

  return (
    <div className={cn('relative h-[calc(100vh-122px)] overflow-hidden')}>
      <div className={cn('sticky z-10 bg-white')}>
        <FilterTabs
          tabsData={tabsData}
          currentTab={searchParams.tab ?? 'all'}
        />
        <div className={cn('h-[46px]')}>
          <FilterDrawers />
        </div>
      </div>
      <div className={cn('h-[calc(100%-94px)] overflow-auto py-[19px]')}>
        <div className={cn('flex flex-col gap-[16px] px-[16px]')}>
          {recruitList.map((recruit) => (
            <RecruitCard key={recruit.title} {...recruit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruitPage;
