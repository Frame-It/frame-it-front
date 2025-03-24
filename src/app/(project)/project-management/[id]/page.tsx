import ManagementGuest from '@/components/project/management/guest/management-guest';
import ManagementHost from '@/components/project/management/host/management-host';
import { ActiveStatus } from '@/types/project.type';
import { redirect } from 'next/navigation';

interface ProjectManagementDetailPageProps {
  params: { id: string };
  searchParams: { status?: ActiveStatus; isHost?: string };
}

// TODO: status와 isHost를 searchParams로 관리하지 말고, 프로젝트 상세 정보 API를 호출해서 받아오는 게 어떨지?
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
