import ManagementTabs from '@/components/project/management/management-tabs';
import ProjectList from '@/components/project/project-list';
import { getUserProjects } from '@/lib/api/project';
import { cn } from '@/lib/utils';
import { IProject } from '@/types/project.type';

const ProjectManagementListPage = async () => {
  const { nickname, projects }: { nickname: string; projects: IProject[] } =
    await getUserProjects();

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ManagementTabs />
      <div className={cn('flex h-[calc(100%-37px)] flex-1 flex-col p-4')}>
        <ProjectList projectList={projects} />
      </div>
    </div>
  );
};

export default ProjectManagementListPage;
