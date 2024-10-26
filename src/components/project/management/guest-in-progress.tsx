'use client';

import Guide from '@/components/common/guide';
import { GuestProjectGuide } from '@/constants/guide';
import { InProgressProject } from '@/lib/api/project/project-management';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import ReviewCheckButton from '../review/review-check-button';
import CompleteProjectButton from './complete-project-button';
import { HostInfo } from './host-info';

interface GuestInProgressContentProps {
  projectId: number;
  project: InProgressProject;
}

const GuestInProgressContent = ({
  projectId,
  project,
}: GuestInProgressContentProps) => {
  const searchParams = useSearchParams();
  const isReviewDone = project.isReviewDone;
  const isReviewDoneQuery = searchParams.get('isReviewDone') === 'true';

  if (!project.host) return;

  return (
    <>
      <div className={cn('flex flex-col gap-2')}>
        {isReviewDone || isReviewDoneQuery ? (
          <ReviewCheckButton
            variant={'secondary'}
            size={'large'}
            reviewId={project.reviewId}
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
          host={project.host}
          reviewId={project.reviewId}
          canViewReview={isReviewDone || isReviewDoneQuery}
        />
        <Guide guides={GuestProjectGuide.inProgress} />
      </div>
    </>
  );
};

export default GuestInProgressContent;
