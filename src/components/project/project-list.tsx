'use client';

import { IProject } from '@/types/project.type';
import { useRouter } from 'next/navigation';
import BottomButton from '../common/bottom-button';
import Icon from '../common/icon';
import ProjectListItem from './project-list-item';

interface ProjectListProps {
  projectList: IProject[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projectList }) => {
  const router = useRouter();
  return (
    <section className="flex h-full flex-auto flex-col">
      {projectList.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-[9px] text-center">
          <Icon id={'pictogram-icon'} width={87} height={71} />
          <div>
            <div className="font-title-16 text-gray-20">
              새로운 프로젝트를 시작해보세요!
            </div>
            <p className="font-body-14 mt-1 text-gray-60">
              모집글을 등록해 작업자를 찾아봐요
            </p>
          </div>
          <BottomButton
            variant={'secondary'}
            size={'middle'}
            label={'모집글 등록하기'}
            className="w-fit px-6"
            onClick={() => router.push('/project-register')}
          />
        </div>
      ) : (
        <ul className="flex h-full flex-auto flex-col gap-[18px] overflow-y-auto scrollbar-hide">
          {projectList.map((project) => (
            <ProjectListItem
              key={project.id}
              project={project}
              routePath={`/project-management/${project.id}?status=${project.status}&isHost=${project.isHost}`}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProjectList;
