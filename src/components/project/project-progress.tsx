'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { Progress } from '../ui/progress';

interface IProjectProgressProps {
  state: 'recruiting' | 'inProgress' | 'complete';
}

const ProjectProgress: React.FunctionComponent<IProjectProgressProps> = ({
  state,
}) => {
  const stateMap = {
    recruiting: { value: 0, label: '모집중' },
    inProgress: { value: 50, label: '진행중' },
    complete: { value: 100, label: '완료' },
  };

  const { value } = stateMap[state];

  return (
    <div className="flex flex-col items-center gap-[6px]">
      <div className="relative w-[243px]">
        <Progress value={value} className="h-[3px] w-full bg-gray-80" />

        <div
          className={cn(
            'absolute left-0 top-[-4px] h-[10px] w-[10px] rounded-full',
            value >= stateMap.recruiting.value ? 'bg-primary' : 'bg-gray-80',
          )}
        />
        <div
          className={cn(
            'absolute left-1/2 top-[-4px] h-[10px] w-[10px] translate-x-[-50%] rounded-full',
            value >= stateMap.inProgress.value ? 'bg-primary' : 'bg-gray-80',
          )}
        />
        <div
          className={cn(
            'absolute right-0 top-[-4px] h-[10px] w-[10px] rounded-full',
            value >= stateMap.complete.value ? 'bg-primary' : 'bg-gray-80',
          )}
        />
      </div>

      <div className="flex w-[278px] gap-[72px] text-xs text-gray-60">
        <span
          className={cn(
            value >= stateMap.recruiting.value ? 'text-primary' : '',
            'font-body-16 flex h-[24px] w-[45px] justify-center text-center',
          )}
        >
          {stateMap.recruiting.label}
        </span>
        <span
          className={cn(
            value >= stateMap.inProgress.value ? 'text-primary' : '',
            'font-body-16 flex h-[24px] w-[45px] justify-center text-center',
          )}
        >
          {stateMap.inProgress.label}
        </span>
        <span
          className={cn(
            value >= stateMap.complete.value ? 'text-primary' : '',
            'font-body-16 flex h-[24px] w-[45px] justify-center text-center',
          )}
        >
          {stateMap.complete.label}
        </span>
      </div>
    </div>
  );
};

export default ProjectProgress;
