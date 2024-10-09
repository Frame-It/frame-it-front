'use client';

import { cn } from '@/lib/utils';
import {
  Tabs,
  TabsList,
  TabsListProps,
  TabsProps,
  TabsTrigger,
  TabsTriggerProps,
} from '@radix-ui/react-tabs';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type TabItem = {
  label: string;
  value: string;
  link: string;
};

interface IFilterTabsProps {
  defaultValue: string;
  tabsData: TabItem[];
}

const FilterTabs = ({ defaultValue, tabsData }: IFilterTabsProps) => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || defaultValue;

  return (
    <CustomTabs defaultValue={currentTab as string}>
      <CustomTabsList>
        {tabsData.map((tab) => (
          <Link key={tab.value} href={tab.link} passHref>
            <CustomTabsTrigger value={tab.value}>{tab.label}</CustomTabsTrigger>
          </Link>
        ))}
      </CustomTabsList>
    </CustomTabs>
  );
};

const CustomTabs = ({ ...props }: TabsProps) => {
  return <Tabs className={cn('flex flex-col')} {...props} />;
};

const CustomTabsList = ({ className, ...props }: TabsListProps) => {
  return (
    <TabsList
      className={cn(
        'flex h-[48px] w-full flex-shrink-0 items-center gap-[16px]',
        'px-[16px] py-[8px]',
        className,
      )}
      {...props}
    />
  );
};

const CustomTabsTrigger = ({ className, ...props }: TabsTriggerProps) => {
  return (
    <TabsTrigger
      className={cn(
        'font-pretendard text-[16px] font-semibold leading-[135%]',
        'text-[#B4ADA9]',
        'data-[state=active]:text-[#E45E25]',
        className,
      )}
      {...props}
    />
  );
};

export { CustomTabs, CustomTabsList, CustomTabsTrigger, FilterTabs };
