'use client';

import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getMyProjects } from '@/service/client-actions/studio';

const ProjectList = () => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['userProject'],
    queryFn: getMyProjects,
    staleTime: 0,
  });

  return (
    <section>
      {data?.projects.length <= 0 ? (
        <div className="mt-12 text-center">
          <div className="font-semibold leading-[135%] text-gray-20">
            아직 등록된 프로젝트가 없습니다.
          </div>
          <p className="mt-1 text-sm leading-[150%] text-gray-60">
            프로젝트를 등록해 작업자를 찾아봐요
          </p>
          <Button
            onClick={() => router.push('/project-register')}
            className="mt-[9px] bg-gray-20 px-6 text-white"
          >
            프로젝트 등록하기
          </Button>
        </div>
      ) : (
        <ul className="mt-[8px] flex flex-col gap-y-[18px]">
          {data?.projects.map((project: any, i: number) => (
            <li
              onClick={() => router.push('/')}
              key={project.title + project.time + i}
              className={cn(
                'flex justify-between gap-x-[13px] pb-[18px]',
                i === data?.projects.length - 1
                  ? ''
                  : 'border border-l-0 border-r-0 border-t-0 border-b-gray-80',
              )}
            >
              <div className="space-y-[12px whitespace-nowrap">
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
                  'h-[22px] whitespace-nowrap bg-white px-[9px] text-xs leading-[150%] hover:bg-white',
                  project.stste === 'RECRUITING' &&
                    'border-sub-green text-sub-green',
                  project.stste === 'IN_PROGRESS' &&
                    'border-sub-blue text-sub-blue',
                  project.stste === 'COMPLETED' &&
                    'border-primary text-primary',
                )}
              >
                {project.stste === 'RECRUITING' && <p>모집중</p>}
                {project.stste === 'IN_PROGRESS' && '진행중'}
                {project.stste === 'COMPLETED' && '완료'}
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProjectList;
