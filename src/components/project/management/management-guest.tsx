import { ActiveStatus } from '@/types/project.type';
import CompletedContent from './guest/completed/completed-content';
import { default as InProgressContent } from './guest/in-progress/in-progress-content';
import RecruitingContent from './guest/recruiting/recruiting-content';

const ManagementGuest = async ({
  projectId,
  status,
}: {
  projectId: number;
  status: ActiveStatus;
}) => {
  switch (status) {
    case 'RECRUITING':
      return <RecruitingContent projectId={projectId} />;
    case 'IN_PROGRESS':
      return <InProgressContent projectId={projectId} />;
    case 'COMPLETED':
      return <CompletedContent projectId={projectId} />;
  }
};

export default ManagementGuest;
