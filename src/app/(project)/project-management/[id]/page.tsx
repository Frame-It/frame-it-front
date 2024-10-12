import ManagementGuest from '@/components/project/management/management-guest';
import ManagementHost from '@/components/project/management/management-host';
import { ActiveStatus } from '@/types/project.type';
import { redirect } from 'next/navigation';

interface ProjectManagementDetailPageProps {
  params: { id: string }; // from URL
  searchParams: { status?: ActiveStatus; isHost?: string }; // from query string
}

const ProjectManagementDetailPage = ({
  params,
  searchParams,
}: ProjectManagementDetailPageProps) => {
  const { id: idStr } = params;
  const { status, isHost } = searchParams;

  const id = Number(idStr);
  const isHostFlag = isHost === 'true';

  if (!status) {
    redirect('/404');
  }

  return isHostFlag ? (
    <ManagementHost id={id} status={status} />
  ) : (
    <ManagementGuest id={id} status={status} />
  );
};

export default ProjectManagementDetailPage;
