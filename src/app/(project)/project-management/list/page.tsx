import ManagementTabs from '@/components/project/management/management-tabs';
import ProjectList from '@/components/project/project-list';

import { cn } from '@/lib/utils';
import { Status } from '@/types/project.type';

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

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ManagementTabs />
      <div className={cn('flex h-[calc(100%-37px)] flex-1 flex-col p-4')}>
        <ProjectList status={status} />
      </div>
    </div>
  );
};

export default ProjectManagementListPage;
