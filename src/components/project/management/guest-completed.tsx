'use client';

import BottomButton from '@/components/common/bottom-button';
import useDisclosure from '@/hooks/useDisclosure';
import { CompletedProject } from '@/lib/api/project/project-management';
import { useRouter, useSearchParams } from 'next/navigation';
import ReviewDialog from '../review/review-dialog';
import { HostInfo } from './host-info';

interface GuestCompletedContentProps {
  projectId: number;
  project: CompletedProject;
}

const GuestCompletedContent = ({
  projectId,
  project,
}: GuestCompletedContentProps) => {
  const { host, reviewId, isReviewDone } = project;
  const { isOpen, onOpenChange, onOpen } = useDisclosure(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const isReviewDoneQuery = searchParams.get('isReviewDone') === 'true';

  const handleClickReview = () => {
    if (isReviewDone || isReviewDoneQuery) onOpen();
    else {
      router.push(
        `/review-register/${projectId}?status=${project.status}&isHost=false`,
      );
    }
  };

  if (!host) return null;
  return (
    <>
      <BottomButton
        variant={'secondary'}
        size={'large'}
        label={
          isReviewDone || isReviewDoneQuery ? '리뷰 확인하기' : '리뷰 작성하기'
        }
        onClick={handleClickReview}
      />
      <HostInfo
        host={host}
        reviewId={host.reviewId}
        canViewReview={isReviewDone}
      />
      {reviewId !== null && (
        <ReviewDialog
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          reviewId={reviewId}
        />
      )}
    </>
  );
};

export default GuestCompletedContent;
