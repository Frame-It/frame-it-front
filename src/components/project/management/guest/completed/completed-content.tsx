import { getCompletedProject } from '@/service/project-management/service';
import { IActiveProject } from '@/types/project.type';
import ReviewCheckButton from '../../../review/review-check-button';
import ReviewWriteButton from '../../../review/review-write-button';
import ManagementGuestLayout from '../guest-layout';
import { HostInfo } from '../host-info';

interface GuestCompletedContentProps {
  projectId: number;
}

const CompletedContent = async ({ projectId }: GuestCompletedContentProps) => {
  const statusProject = await getCompletedProject(projectId, 'GUEST');

  const { host, reviewId, isReviewDone } = statusProject;

  if (!host) return null;
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
      {isReviewDone && reviewId ? (
        <ReviewCheckButton
          variant={'secondary'}
          size={'large'}
          reviewId={reviewId}
          canViewReview
        />
      ) : (
        <ReviewWriteButton
          variant={'secondary'}
          size={'large'}
          projectId={projectId}
          status={'COMPLETED'}
        />
      )}
      <HostInfo
        host={host}
        reviewId={host.reviewId}
        canViewReview={isReviewDone}
      />
    </ManagementGuestLayout>
  );
};

export default CompletedContent;
