'use client';

import BottomButton from '@/components/common/bottom-button';
import useDisclosure from '@/hooks/useDisclosure';
import { ProjectMember } from '@/lib/api/project/project-management';
import { useRouter } from 'next/navigation';
import ReviewDialog from './review-dialog';

export const HostReviewDialogButton = ({
  projectId,
  reviewId,
  guest,
}: {
  projectId: number;
  reviewId: number | null;
  guest: ProjectMember;
}) => {
  const router = useRouter();
  const { isOpen: isReviewDialogOpen, setIsOpen: setIsReviewDialogOpen } =
    useDisclosure(false);
  const isReviewDone = true;

  const handleClickReview = () => {
    if (isReviewDone) {
      setIsReviewDialogOpen(true);
    } else {
      router.push(`/review-register/${projectId}`);
    }
  };

  return (
    <>
      <BottomButton
        variant={'secondary'}
        size={'large'}
        label={'리뷰 작성하기'}
        onClick={handleClickReview}
      />
      {reviewId && (
        <ReviewDialog
          reviewId={reviewId}
          isOpen={isReviewDialogOpen}
          onOpenChange={setIsReviewDialogOpen}
        />
      )}
    </>
  );
};

export const GuestReviewDialogButton = ({
  host,
  reviewId,
}: {
  host: { userId: string; name: string };
  reviewId: number | null;
}) => {
  const { isOpen: isReviewDialogOpen, onToggle: toggleReviewDialog } =
    useDisclosure(false);

  const handleClickHost = () => {
    if (reviewId) {
      toggleReviewDialog();
    } else {
      // TODO: 호스트에게 dm
    }
  };

  return (
    <>
      <BottomButton
        variant={'stroke'}
        size={'small'}
        label={reviewId === null ? '호스트에게 DM하기' : '리뷰 확인하기'}
        className="font-tag-12 max-w-[126px]"
        onClick={handleClickHost}
      />
      {reviewId && (
        <ReviewDialog
          reviewId={reviewId}
          isOpen={isReviewDialogOpen}
          onOpenChange={toggleReviewDialog}
          name={host.name}
        />
      )}
    </>
  );
};
