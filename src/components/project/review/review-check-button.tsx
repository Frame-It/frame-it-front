'use client';

import BottomButton, {
  BottomButtonProps,
} from '@/components/common/bottom-button';
import useDisclosure from '@/hooks/useDisclosure';
import ReviewDialog from './review-dialog';

const ReviewCheckButton = ({
  reviewId,
  canViewReview = true,
  ...props
}: {
  reviewId: number | null;
  canViewReview?: boolean;
} & Pick<BottomButtonProps, 'variant' | 'size' | 'className'>) => {
  const { isOpen: isReviewDialogOpen, onToggle: toggleReviewDialog } =
    useDisclosure(false);

  return (
    <>
      <BottomButton
        label={'리뷰 확인하기'}
        onClick={toggleReviewDialog}
        disabled={!canViewReview || reviewId === null}
        {...props}
      />
      {reviewId !== null && (
        <ReviewDialog
          reviewId={reviewId}
          isOpen={isReviewDialogOpen}
          onOpenChange={toggleReviewDialog}
        />
      )}
    </>
  );
};

export default ReviewCheckButton;
