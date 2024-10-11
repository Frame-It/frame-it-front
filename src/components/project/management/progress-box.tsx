import { cn } from '@/lib/utils';
import { IProject } from '@/types/project';
import ProjectProgress from './project-progress';

const ProgressBox = ({ state }: { state: IProject['state'] }) => {
  return (
    <div
      className={cn(
        'flex h-[80px] justify-center rounded-[8px] border border-gray-80 pt-[26px]',
      )}
    >
      <ProjectProgress state={state} />
    </div>
  );
};

export default ProgressBox;
