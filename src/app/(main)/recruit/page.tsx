'use client';

import { FilterTabs } from '@/components/common/filter-tabs';
import FilterDrawers from '@/components/project/filter-drawers';
import RecruitCard, {
  IRecruitCardProps,
} from '@/components/project/recruit-card';
import { generateRandomImageList } from '@/lib/faker';
import { cn } from '@/lib/utils';
import { USER_TYPE, UserValue } from '@/types/filter';
import { faker } from '@faker-js/faker/locale/ko';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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

const RecruitPage = () => {
  const [tempRecruitList, setTempRecruitList] = useState<IRecruitCardProps[]>(
    [],
  );
  const router = useRouter();

  useEffect(() => {
    const imageArr = Array.from({ length: 10 }, () =>
      generateRandomImageList(),
    );
    setTempRecruitList(
      imageArr.map((img) => ({
        imageUrl: img.url,
        type: '모델구인',
        title: faker.music.songName(),
        location: faker.location.city(),
        date: faker.date.anytime().toDateString(),
        tagList: Array.from({ length: 3 }, () => faker.music.genre()),
      })),
    );
  }, []);

  return (
    <div className={cn('relative h-[calc(100vh-122px)] overflow-hidden')}>
      <div className={cn('sticky z-10 bg-white')}>
        <FilterTabs defaultValue="ALL" tabsData={tabsData} />
        <div className={cn('h-[46px]')}>
          <FilterDrawers />
        </div>
      </div>
      <div className={cn('h-[calc(100%-94px)] overflow-auto py-[19px]')}>
        <div className={cn('flex flex-col gap-[16px] px-[16px]')}>
          {tempRecruitList.map((recruit) => (
            <RecruitCard key={recruit.title} {...recruit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruitPage;
