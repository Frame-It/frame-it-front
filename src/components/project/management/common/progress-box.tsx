import { cn } from '@/lib/utils';
import { ActiveStatus } from '@/types/project.type';
import ProjectProgress from './project-progress';

const ProgressBox = ({ status }: { status: ActiveStatus }) => {
  return (
    <div
      className={cn(
        'flex h-[80px] justify-center rounded-[8px] border border-gray-80 pt-[26px]',
      )}
    >
      <ProjectProgress status={status} />
    </div>
  );
};

export default ProgressBox;
