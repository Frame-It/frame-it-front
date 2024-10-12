'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import Drawer from '../../common/drawer';
import Icon from '../../common/icon';
import {
  AddressDrawerContent,
  ConceptDrawerContent,
  DateDrawerContent,
  LocationDrawerContent,
} from './drawer-content';
import DropdownButton from './dropdown-button';

const filterOptions = {
  concept: {
    label: '촬영컨셉',
    component: ConceptDrawerContent,
  },
  location: {
    label: '지역',
    component: AddressDrawerContent,
  },
  date: {
    label: '촬영일시',
    component: DateDrawerContent,
  },
  place: {
    label: '촬영장소',
    component: LocationDrawerContent,
  },
} as const;

type FilterType = keyof typeof filterOptions;

const FilterDrawers = () => {
  // TODO: 필터 초기화
  const [openFilter, setOpenFilter] = useState<FilterType | null>(null);

  const onOpenChange = (open: boolean, filter: FilterType) => {
    setOpenFilter(open ? filter : null);
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
      {Object.entries(filterOptions).map(
        ([key, { label, component: Component }]) => (
          <Drawer
            key={key}
            title={label}
            open={openFilter === key}
            onOpenChange={(open) => onOpenChange(open, key as FilterType)}
            onClose={() => setOpenFilter(null)}
            trigger={<DropdownButton key={key} label={label} />}
          >
            <Component onClose={() => setOpenFilter(null)} />
          </Drawer>
        ),
      )}
    </div>
  );
};

export default FilterDrawers;
