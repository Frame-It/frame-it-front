'use client';

import Guide from '@/components/common/guide';
import { HostProjectGuide } from '@/constants/guide';
import { InProgressProject } from '@/lib/api/project/project-management';
import { useSearchParams } from 'next/navigation';
import ReviewCheckButton from '../review/review-check-button';
import { StartedProjectApplyGuest } from './apply-info';
import CompleteProjectButton from './complete-project-button';

interface HostInProgressContentProps {
  projectId: number;
  project: InProgressProject;
}

const HostInProgressContent = ({
  projectId,
  project,
}: HostInProgressContentProps) => {
  const searchParams = useSearchParams();
  const isReviewDoneQuery = searchParams.get('isReviewDone') === 'true';

  const { isReviewDone, reviewId } = project;

  if (!project.guest) return;

  return (
    <>
      {isReviewDone || isReviewDoneQuery ? (
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
        guest={project.guest}
        id={projectId}
        status={'IN_PROGRESS'}
        applyContent={project.applyContent}
        appliedAt={project.appliedAt}
      />
    </>
  );
};

export default HostInProgressContent;
