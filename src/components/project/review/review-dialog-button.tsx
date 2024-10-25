'use client';

import BottomButton from '@/components/common/bottom-button';
import DMButton from '@/components/common/dm-button';
import useDisclosure from '@/hooks/useDisclosure';
import { ProjectMember } from '@/lib/api/project/project-management';
import { ActiveStatus } from '@/types/project.type';
import { useRouter } from 'next/navigation';
import ReviewDialog from './review-dialog';

export const HostReviewDialogButton = ({
  projectId,
  reviewId,
  guest,
  status,
}: {
  projectId: number;
  reviewId: number | null;
  guest: ProjectMember;
  status: ActiveStatus;
}) => {
  const router = useRouter();
  const { isOpen: isReviewDialogOpen, setIsOpen: setIsReviewDialogOpen } =
    useDisclosure(false);
  const isReviewDone = reviewId !== null;

  const handleClickReview = () => {
    if (isReviewDone) {
      setIsReviewDialogOpen(true);
    } else {
      router.push(`/review-register/${projectId}?status=${status}`);
    }
  };

  return (
    <>
      <BottomButton
        variant={'secondary'}
        size={'large'}
        label={isReviewDone ? '리뷰 확인하기' : '리뷰 작성하기'}
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
  canViewReview = true,
}: {
  host: { userId: number; name: string };
  reviewId: number | null;
  canViewReview?: boolean;
}) => {
  const { isOpen: isReviewDialogOpen, onToggle: toggleReviewDialog } =
    useDisclosure(false);

  return (
    <>
      {reviewId === null ? (
        <DMButton
          variant={'stroke'}
          size={'small'}
          label={'호스트에게 DM하기'}
          className="font-tag-12 max-w-[126px]"
          participantId={host.userId}
        />
      ) : (
        <>
          <BottomButton
            variant={'stroke'}
            size={'small'}
            label={'리뷰 확인하기'}
            className="font-tag-12 max-w-[126px]"
            onClick={toggleReviewDialog}
            disabled={!canViewReview}
          />
          <ReviewDialog
            reviewId={reviewId}
            isOpen={isReviewDialogOpen}
            onOpenChange={toggleReviewDialog}
            name={host.name}
          />
        </>
      )}
    </>
  );
};
