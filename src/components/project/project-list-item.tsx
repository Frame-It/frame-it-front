'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { IProject } from '@/types/project'; // Importing the Project type
import { useRouter } from 'next/navigation';

interface ProjectItemProps {
  project: IProject;
  routePath?: string;
  isMine?: boolean;
}

const ProjectListItem: React.FC<ProjectItemProps> = ({
  project,
  routePath = 'project-recruitment',
  isMine = false,
}) => {
  const router = useRouter();

  return (
    <li
      onClick={() => router.push(`/${routePath}/${project.id}`)}
      className="flex justify-between gap-x-[13px] border-b border-gray-80 pb-[18px]"
    >
      <div className="space-y-[12px]">
        <div className="font-semibold leading-[135%] text-gray-20">
          {project.title}
        </div>
        <div className="flex items-center gap-1">
          {isMine && <MyBadge />}
          <div className="font-body-14 flex items-center leading-[150%] text-gray-40">
            <span className='after:mx-2 after:content-["|"]'>
              {project.location}
            </span>
            <span className='after:mx-2 after:content-["|"]'>
              {project.date}
            </span>
            <span>{project.time}</span>
          </div>
        </div>
      </div>
      <Badge
        className={cn(
          'h-[22px] whitespace-nowrap bg-white px-[9px] text-xs leading-[150%] hover:bg-white',
          project.state === 'recruiting' && 'border-sub-green text-sub-green',
          project.state === 'inProgress' && 'border-sub-blue text-sub-blue',
          project.state === 'complete' && 'border-primary text-primary',
        )}
      >
        {project.state === 'recruiting' && '모집중'}
        {project.state === 'inProgress' && '진행중'}
        {project.state === 'complete' && '완료'}
      </Badge>
    </li>
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
