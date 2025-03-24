import { ActiveStatus } from '@/types/project.type';
import CompletedContent from './host/completed/completed-content';
import InProgressContent from './host/in-progress/in-progress-content';
import RecruitingContent from './host/recruiting/recruiting-content';

interface HostContentProps {
  projectId: number;
  status: ActiveStatus;
}
const ManagementHost = async ({ projectId, status }: HostContentProps) => {
  switch (status) {
    case 'RECRUITING':
      return <RecruitingContent projectId={projectId} />;
    case 'IN_PROGRESS':
      return <InProgressContent projectId={projectId} />;
    case 'COMPLETED':
      return <CompletedContent projectId={projectId} />;
  }
};

export default ManagementHost;
