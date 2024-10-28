import ManagementGuest from '@/components/project/management/management-guest';
import ManagementHost from '@/components/project/management/management-host';
import { ActiveStatus } from '@/types/project.type';
import { redirect } from 'next/navigation';

interface ProjectManagementDetailPageProps {
  params: { id: string };
  searchParams: { status?: ActiveStatus; isHost?: string };
}

const ProjectManagementDetailPage = ({
  params,
  searchParams,
}: ProjectManagementDetailPageProps) => {
  const { id: idStr } = params;
  const { status, isHost } = searchParams;

  const projectId = Number(idStr);

  if (!status) {
    redirect('/404');
  }

  return isHost === 'true' ? (
    <ManagementHost projectId={projectId} status={status} />
  ) : (
    <ManagementGuest projectId={projectId} status={status} />
  );
};

export default ProjectManagementDetailPage;
