'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { Progress } from '../../../ui/progress';

interface IProjectProgressProps {
  status: 'RECRUITING' | 'IN_PROGRESS' | 'COMPLETED';
}

const ProjectProgress: React.FunctionComponent<IProjectProgressProps> = ({
  status,
}) => {
  const stateMap = {
    RECRUITING: { value: 0, label: '모집중' },
    IN_PROGRESS: { value: 50, label: '진행중' },
    COMPLETED: { value: 100, label: '완료' },
  };

  const { value } = stateMap[status];

  return (
    <div className="flex flex-col items-center gap-[6px]">
      <div className="relative w-[243px]">
        <Progress value={value} className="h-[3px] w-full bg-gray-80" />

        <div
          className={cn(
            'absolute left-0 top-[-4px] h-[10px] w-[10px] rounded-full',
            value >= stateMap.RECRUITING.value ? 'bg-primary' : 'bg-gray-80',
          )}
        />
        <div
          className={cn(
            'absolute left-1/2 top-[-4px] h-[10px] w-[10px] translate-x-[-50%] rounded-full',
            value >= stateMap.IN_PROGRESS.value ? 'bg-primary' : 'bg-gray-80',
          )}
        />
        <div
          className={cn(
            'absolute right-0 top-[-4px] h-[10px] w-[10px] rounded-full',
            value >= stateMap.COMPLETED.value ? 'bg-primary' : 'bg-gray-80',
          )}
        />
      </div>

      <div className="flex w-[278px] gap-[72px] text-xs text-gray-60">
        <span
          className={cn(
            value >= stateMap.RECRUITING.value ? 'text-primary' : '',
            'font-body-16 flex h-[24px] w-[45px] justify-center text-center',
          )}
        >
          {stateMap.RECRUITING.label}
        </span>
        <span
          className={cn(
            value >= stateMap.IN_PROGRESS.value ? 'text-primary' : '',
            'font-body-16 flex h-[24px] w-[45px] justify-center text-center',
          )}
        >
          {stateMap.IN_PROGRESS.label}
        </span>
        <span
          className={cn(
            value >= stateMap.COMPLETED.value ? 'text-primary' : '',
            'font-body-16 flex h-[24px] w-[45px] justify-center text-center',
          )}
        >
          {stateMap.COMPLETED.label}
        </span>
      </div>
    </div>
  );
};

export default ProjectProgress;
