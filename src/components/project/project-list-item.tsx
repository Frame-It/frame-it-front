import { Badge } from '@/components/ui/badge';
import { timeOptionLabels } from '@/constants/project';
import { cn } from '@/lib/utils';
import { IManageProject } from '@/types/project.type';
import Link from 'next/link';

interface ProjectItemProps {
  project: IManageProject;
  routePath?: string;
}

const ProjectListItem: React.FC<ProjectItemProps> = ({
  project,
  routePath,
}) => {
  return (
    <Link
      href={routePath ? routePath : `/project-recruitment/${project.id}`}
      className="flex justify-between gap-x-[13px] border-b border-gray-80 pb-[18px]"
    >
      <div className="space-y-[12px]">
        <div className="font-semibold leading-[135%] text-gray-20">
          {project.title}
        </div>
        <div className="flex items-center gap-1">
          {project.isHost && <MyBadge />}
          <div className="font-body-14 flex items-center leading-[150%] text-gray-40">
            <span className='after:mx-2 after:content-["|"]'>
              {project.address}
            </span>
            <span className='after:mx-2 after:content-["|"]'>
              {project.shootingAt.slice(5, 10).split('-').join('/')}
            </span>
            <span>{timeOptionLabels[project.timeOption]}</span>
          </div>
        </div>
      </div>
      <Badge
        className={cn(
          'h-[22px] whitespace-nowrap bg-white px-[9px] text-xs leading-[150%] hover:bg-white',
          project.status === 'RECRUITING' && 'border-sub-green text-sub-green',
          project.status === 'IN_PROGRESS' && 'border-sub-blue text-sub-blue',
          project.status === 'COMPLETED' && 'border-primary text-primary',
        )}
      >
        {project.status === 'RECRUITING' && '모집중'}
        {project.status === 'IN_PROGRESS' && '진행중'}
        {project.status === 'COMPLETED' && '완료'}
      </Badge>
    </Link>
  );
};

const MyBadge = () => {
  return (
    <div className="font-tiny-body flex h-fit flex-shrink-0 items-center justify-center gap-[8px] rounded-[4px] border border-gray-60 bg-gray-80 px-[5px] py-[1px] text-center text-gray-40">
      MY
    </div>
  );
};

export default ProjectListItem;
