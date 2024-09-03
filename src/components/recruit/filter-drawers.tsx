'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import Drawer from '../common/drawer';
import Icon from '../common/icon';
import DropdownButton from './dropdown-button';

const filterOptions = {
  concept: '촬영컨셉',
  location: '지역',
  date: '촬영일시',
  place: '촬영장소',
} as const;

type FilterType = keyof typeof filterOptions;

const FilterDrawers = () => {
  const [openFilter, setOpenFilter] = useState<FilterType | null>(null);

  const toggleDrawer = (filter: FilterType) => {
    setOpenFilter((prev) => {
      return prev === filter ? null : filter;
    });
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 self-stretch overflow-x-scroll p-2 px-4 scrollbar-hide',
      )}
    >
      <button
        className={cn(
          'flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full border-[1px] border-[#4D4744]',
        )}
      >
        <Icon
          id={'reload-icon'}
          width={18}
          height={18}
          className={cn('flex-shrink-0')}
        />
      </button>
      {Object.entries(filterOptions).map(([key, label]) => (
        <Drawer
          key={key}
          title={label}
          open={openFilter === key}
          toggleOpen={() => toggleDrawer(key as FilterType)}
          onClose={() => setOpenFilter(null)}
          trigger={<DropdownButton key={key} label={label} />}
        >
          <div>{/* 각 필터링 Drawer의 내용 */}</div>
        </Drawer>
      ))}
    </div>
  );
};

export default FilterDrawers;
