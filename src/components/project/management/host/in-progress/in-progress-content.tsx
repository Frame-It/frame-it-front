import Guide from '@/components/common/guide';
import { HostProjectGuide } from '@/constants/guide';
import { getInProgressProject } from '@/service/project-management/service';
import { IActiveProject } from '@/types/project.type';
import ReviewCheckButton from '../../../review/review-check-button';
import { StartedProjectApplyGuest } from '../../common/apply-info';
import CompleteProjectButton from '../../common/complete-project-button';
import ManagementHostLayout from '../host-layout';

interface HostInProgressContentProps {
  projectId: number;
}

const InProgressContent = async ({ projectId }: HostInProgressContentProps) => {
  const statusProject = await getInProgressProject(projectId, 'HOST');

  const { isReviewDone, reviewId } = statusProject;

  if (!statusProject.guest) return;

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
          variant={'secondary'}
          size={'large'}
          reviewId={reviewId}
          canViewReview
        />
      ) : (
        <CompleteProjectButton
          variant={'secondary'}
          size={'large'}
          projectId={projectId}
          isHost={true}
        />
      )}
      <Guide guides={HostProjectGuide.inProgress} />
      <StartedProjectApplyGuest
        guest={statusProject.guest}
        id={projectId}
        status={'IN_PROGRESS'}
        applyContent={statusProject.applyContent}
        appliedAt={statusProject.appliedAt}
      />
    </ManagementHostLayout>
  );
};

export default InProgressContent;
