import ManagementGuest from '@/components/project/management/guest/management-guest';
import ManagementHost from '@/components/project/management/host/management-host';
import { getProjectStatus } from '@/service/project-management/service';
import { redirect } from 'next/navigation';

interface ProjectManagementDetailPageProps {
  params: { id: string };
}

const ProjectManagementDetailPage = async ({
  params,
}: ProjectManagementDetailPageProps) => {
  const { id: idStr } = params;
  const projectId = Number(idStr);

  const projectInfo = await getProjectStatus(projectId);

  const { status, isHost } = projectInfo;

  if (!status) {
    redirect('/404');
  }

  return isHost ? (
    <ManagementHost projectId={projectId} status={status} />
  ) : (
    <ManagementGuest projectId={projectId} status={status} />
  );
};

export default ProjectManagementDetailPage;
