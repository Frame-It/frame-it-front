'use client';

import { ICompletedProjectRes } from '@/lib/api/project/project.interface';
import { useSearchParams } from 'next/navigation';
import ReviewCheckButton from '../review/review-check-button';
import ReviewWriteButton from '../review/review-write-button';
import { HostInfo } from './host-info';

interface GuestCompletedContentProps {
  projectId: number;
  project: ICompletedProjectRes;
}

const GuestCompletedContent = ({
  projectId,
  project,
}: GuestCompletedContentProps) => {
  const { host, reviewId, isReviewDone } = project;
  const searchParams = useSearchParams();

  const isReviewDoneQuery = searchParams.get('isReviewDone') === 'true';

  if (!host) return null;
  return (
    <>
      {(isReviewDone || isReviewDoneQuery) && reviewId ? (
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
    </>
  );
};

export default GuestCompletedContent;
