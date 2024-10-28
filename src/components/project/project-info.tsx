import { timeOptionLabels } from '@/constants/project';
import { cn } from '@/lib/utils';
import { IProject } from '@/types/project.type';

const ProjectInfo = ({
  project,
}: {
  project: Pick<IProject, 'shootingAt' | 'title' | 'address' | 'timeOption'>;
}) => {
  return (
    <div className="flex flex-col gap-1 rounded-[8px] bg-gray-90 px-[12px] py-[14px]">
      <h2 className="font-title-18 text-gray-10">프로젝트</h2>
      <h2 className="font-body-14m text-gray-10">{project.title}</h2>
      <div className="flex items-center">
        <p
          className={cn(
            'font-tag-14 text-gray-40 after:mx-[6px] after:content-["|"]',
          )}
        >
          {project.address}
        </p>
        <p
          className={cn(
            'font-tag-14 text-gray-40 after:mx-[6px] after:content-["|"]',
          )}
        >
          {project.shootingAt.split('T')[0]}
        </p>
        <p className={cn('font-tag-14 text-gray-40 after:mx-[6px]')}>
          {timeOptionLabels[project.timeOption]}
        </p>
      </div>
    </div>
  );
};

export default ProjectInfo;
