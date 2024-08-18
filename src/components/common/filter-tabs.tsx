import { cn } from '@/lib/utils';
import {
  Tabs,
  TabsList,
  TabsListProps,
  TabsProps,
  TabsTrigger,
  TabsTriggerProps,
} from '@radix-ui/react-tabs';

type TabItem = {
  label: string;
  value: string;
};

interface IFilterTabsProps {
  defaultValue: string;
  onValueChange: (value: string) => void;
  tabsData: TabItem[];
}

const FilterTabs = ({
  defaultValue,
  onValueChange,
  tabsData,
}: IFilterTabsProps) => {
  return (
    <CustomTabs defaultValue={defaultValue} onValueChange={onValueChange}>
      <CustomTabsList>
        {tabsData.map((tab) => (
          <CustomTabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </CustomTabsTrigger>
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
