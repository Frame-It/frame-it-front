'use client';

import { FilterTabs } from '@/components/common/filter-tabs';
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
    <div>
      <FilterTabs
        defaultValue="ALL"
        onValueChange={handleChange}
        tabsData={tabsData}
      />
      <div>필터</div>
      <div>
        <div>구인 카드</div>
        <div>구인 카드</div>
        <div>구인 카드</div>
        <div>구인 카드</div>
        <div>구인 카드</div>
        <div>구인 카드</div>
      </div>
    </div>
  );
};

export default RecruitPage;
