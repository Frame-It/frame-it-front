import { IRecruitCardProps } from '@/components/project/recruit-card';
import RecruitClient from '@/components/project/recruitment/recruit-client';
import { PROJECT_CONCEPTS } from '@/constants/project';
import {
  IRecruitResponse,
  getRecruitAnnouncements,
} from '@/lib/api/project/project-recruitment';
import { ITabData, USER_TYPE } from '@/types/filter';
import { LocationType, TimeOption } from '@/types/project.type';

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
  searchParams: {
    tab?: string;
    startDate?: string;
    endDate?: string;
    timeOption?: string;
    locationType?: string;
    concepts?: string;
  };
}) => {
  const filter = {
    recruitmentRole:
      searchParams.tab === 'all'
        ? undefined
        : (searchParams.tab as IRecruitResponse['recruitmentRole']),
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
    timeOption: searchParams.timeOption as TimeOption,
    locationType: searchParams.locationType as LocationType,
    concepts: searchParams.concepts?.split('+'),
  };

  const fetchedData = await getRecruitAnnouncements(filter);

  const recruitList: IRecruitCardProps[] = fetchedData.map(
    (item: IRecruitResponse) => ({
      id: item.id,
      imageUrl: item.previewImageUrl,
      type: item.recruitmentRole,
      title: item.title,
      location: item.spot,
      date: new Date(item.shootingAt).toDateString(),
      tagList: item.concepts.map((v) =>
        PROJECT_CONCEPTS.find((concept) => concept.id === v),
      ),
      isBookmarked: item.isBookmarked,
    }),
  );

  return (
    <RecruitClient
      recruitList={recruitList}
      currentTab={searchParams.tab ?? 'all'}
      tabsData={tabsData}
      filter={filter}
    />
  );
};

export default RecruitPage;
