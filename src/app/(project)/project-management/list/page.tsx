import ManagementTabs from '@/components/project/management/management-tabs';
import ProjectList from '@/components/project/project-list';
import { getUserProjects } from '@/lib/api/project/project-management';

import { cn } from '@/lib/utils';
import { IProject, Status } from '@/types/project.type';

interface IProjectManagementListPageProps {
  searchParams: { type?: string };
}

const ProjectManagementListPage = async ({
  searchParams,
}: IProjectManagementListPageProps) => {
  const filter = searchParams.type || 'all';

  const statusMap: Record<string, Status> = {
    recruiting: 'RECRUITING',
    progress: 'IN_PROGRESS',
    completed: 'COMPLETED',
    cancelled: 'CANCELED',
  };

  const status = filter !== 'all' ? statusMap[filter] : undefined;

  const { projects }: { projects: IProject[] } = await getUserProjects(status);

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
