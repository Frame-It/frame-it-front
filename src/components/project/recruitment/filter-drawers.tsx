'use client';

import { IRecruitFilter } from '@/lib/api/project/project.interface';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
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
  concepts: {
    label: '촬영컨셉',
    component: ConceptDrawerContent,
  },
  spot: {
    label: '지역',
    component: AddressDrawerContent,
  },
  startDate: {
    label: '촬영일시',
    component: DateDrawerContent,
  },
  locationType: {
    label: '촬영장소',
    component: LocationDrawerContent,
  },
} as const;

type FilterType = keyof typeof filterOptions;

const FilterDrawers = ({ filter }: { filter: IRecruitFilter }) => {
  const [openFilter, setOpenFilter] = useState<FilterType | null>(null);
  const router = useRouter();
  const onOpenChange = (open: boolean, filter: FilterType) => {
    setOpenFilter(open ? filter : null);
  };

  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

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
        onClick={() => router.push(`/recruit?tab=${tab ?? 'all'}`)}
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
            trigger={
              <DropdownButton
                key={key}
                label={label}
                isSelected={filter[key as keyof IRecruitFilter] !== undefined}
              />
            }
          >
            <Component onClose={() => setOpenFilter(null)} />
          </Drawer>
        ),
      )}
    </div>
  );
};

export default FilterDrawers;
