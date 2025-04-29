import ReviewCheckButton from '@/components/project/review/review-check-button';
import ReviewWriteButton from '@/components/project/review/review-write-button';
import { getCompletedProject } from '@/service/project-management/service';
import { IActiveProject } from '@/types/project.type';
import { StartedProjectApplyGuest } from '../../common/apply-info';
import ManagementHostLayout from '../host-layout';

interface CompletedContentProps {
  projectId: number;
}

const CompletedContent = async ({ projectId }: CompletedContentProps) => {
  const statusProject = await getCompletedProject(projectId, 'HOST');

  const { guest, reviewId } = statusProject;
  const isReviewDone = reviewId !== null;

  if (!guest) return;

  const project: IActiveProject = {
    status: statusProject.status,
    id: projectId,
    title: statusProject.title,
    shootingAt: statusProject.shootingAt,
    timeOption: statusProject.timeOption,
    address: statusProject.address,
    isHost: true,
  };

  return (
    <ManagementHostLayout project={project}>
      {isReviewDone ? (
        <ReviewCheckButton
          reviewId={reviewId}
          canViewReview={true}
          variant={'secondary'}
          size={'large'}
        />
      ) : (
        <ReviewWriteButton
          projectId={projectId}
          status={'COMPLETED'}
          variant={'secondary'}
          size={'large'}
        />
      )}
      <StartedProjectApplyGuest
        status={'COMPLETED'}
        guest={guest}
        id={projectId}
        applyContent={guest.applyContent}
        appliedAt={guest.appliedAt}
      />
    </ManagementHostLayout>
  );
};

export default CompletedContent;
