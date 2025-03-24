import Guide from '@/components/common/guide';
import { GuestProjectGuide } from '@/constants/guide';
import { cn } from '@/lib/utils';
import { getInProgressProject } from '@/service/project-management/service';
import { IActiveProject } from '@/types/project.type';
import ReviewCheckButton from '../../../review/review-check-button';
import CompleteProjectButton from '../../complete-project-button';
import { HostInfo } from '../../host-info';
import ManagementGuestLayout from '../guest-layout';

interface GuestInProgressContentProps {
  projectId: number;
}

const InProgressContent = async ({
  projectId,
}: GuestInProgressContentProps) => {
  const statusProject = await getInProgressProject(projectId, 'GUEST');
  const isReviewDone = statusProject.isReviewDone;

  if (!statusProject.host) return;

  const project: IActiveProject = {
    status: statusProject.status,
    id: projectId,
    title: statusProject.title,
    shootingAt: statusProject.shootingAt,
    timeOption: statusProject.timeOption,
    address: statusProject.address,
    isHost: false,
  };

  return (
    <ManagementGuestLayout project={project}>
      <div className={cn('flex flex-col gap-2')}>
        {isReviewDone ? (
          <ReviewCheckButton
            variant={'secondary'}
            size={'large'}
            reviewId={statusProject.reviewId}
          />
        ) : (
          <CompleteProjectButton
            variant={'secondary'}
            size={'large'}
            projectId={projectId}
            isHost={false}
          />
        )}
        <HostInfo
          host={statusProject.host}
          reviewId={statusProject.reviewId}
          canViewReview={isReviewDone}
        />
        <Guide guides={GuestProjectGuide.inProgress} />
      </div>
    </ManagementGuestLayout>
  );
};

export default InProgressContent;
