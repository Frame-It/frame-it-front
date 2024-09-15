'use client';

import useDisclosure from '@/hooks/useDisclosure';
import { cn } from '@/lib/utils';
import Icon from './icon';

interface IGuideProps {
  guides: string[];
  title?: string;
  collapsible?: boolean;
}

const Guide: React.FunctionComponent<IGuideProps> = ({
  guides,
  title,
  collapsible = false,
}) => {
  const { isOpen, onToggle } = useDisclosure(false);

  return (
    <div
      className={cn(
        'flex flex-col items-start gap-[5px] self-stretch rounded-[8px] bg-gray-90 p-[10px_12px]',
      )}
    >
      {title && (
        <div className="flex w-full items-center justify-between">
          <div
            className={cn(
              'text-gray-40',
              collapsible ? 'font-body-14m' : 'font-body-14',
            )}
          >
            {title}
          </div>
          {collapsible && (
            <Icon
              onClick={onToggle}
              className="text-gray-40"
              id={isOpen ? 'arrow-up-icon' : 'arrow-down-icon'}
              size={24}
            />
          )}
        </div>
      )}

      {(!collapsible || isOpen) && (
        <div>
          {guides.map((guide) => (
            <div key={guide} className="flex items-start gap-2">
              <span className="mt-[7px] h-[3px] w-[3px] flex-shrink-0 rounded-full bg-gray-40" />
              <div className="font-caption-12 text-gray-40">{guide}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Guide;
