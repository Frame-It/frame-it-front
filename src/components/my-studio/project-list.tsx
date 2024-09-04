'use client';

import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface tempProject {
  id: string;
  title: string;
  stste: 'recruiting' | 'inProgress' | 'complete';
  location: string;
  date: string;
  time: string;
}

interface IProjectListProps {
  projectList: tempProject[];
}

const ProjectList: React.FunctionComponent<IProjectListProps> = ({
  projectList,
}) => {
  const router = useRouter();

  return (
    <section>
      {projectList.length <= 0 && (
        <div className="mt-12 text-center">
          <div className="font-semibold leading-[135%] text-gray-20">
            아직 등록된 프로젝트가 없습니다.
          </div>
          <p className="mt-1 text-sm leading-[150%] text-gray-60">
            프로젝트를 등록해 작업자를 찾아봐요
          </p>
          <Button className="mt-[9px] bg-gray-20 px-6 text-white">
            프로젝트 등록하기
          </Button>
        </div>
      )}
      <ul className="flex flex-col gap-y-[18px]">
        {projectList.map((project) => (
          <li
            onClick={() => router.push('/')}
            key={project.title + project.time}
            className="flex justify-between gap-x-[13px] border border-l-0 border-r-0 border-t-0 border-b-gray-80 pb-[18px]"
          >
            <div className="space-y-[12px]">
              <div className="font-semibold leading-[135%] text-gray-20">
                {project.title}
              </div>
              <div className="flex items-center leading-[150%] text-gray-40">
                <span className='after:mx-2 after:content-["|"]'>
                  {project.location}
                </span>
                <span className='after:mx-2 after:content-["|"]'>
                  {project.date}
                </span>
                <span>{project.time}</span>
              </div>
            </div>
            <Badge
              className={cn(
                'h-[22px] bg-white px-[9px] text-xs leading-[150%]',
                project.stste === 'recruiting' &&
                  'border-sub-green text-sub-green',
                project.stste === 'inProgress' &&
                  'border-sub-blue text-sub-blue',
                project.stste === 'complete' && 'border-primary text-primary',
              )}
            >
              {project.stste === 'recruiting' && <p>모집중</p>}
              {project.stste === 'inProgress' && '진행중'}
              {project.stste === 'complete' && '완료'}
            </Badge>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectList;
