'use client';

import BottomButton from '@/components/common/bottom-button';
import Guide from '@/components/common/guide';
import { GuestProjectGuide } from '@/constants/guide';
import useDisclosure from '@/hooks/useDisclosure';
import {
  InProgressProject,
  postCompleteProject,
} from '@/lib/api/project/project-management';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import ReviewDialog from '../review/review-dialog';
import { HostInfo } from './host-info';

interface GuestInProgressContentProps {
  projectId: number;
  project: InProgressProject;
}

const GuestInProgressContent = ({
  projectId,
  project,
}: GuestInProgressContentProps) => {
  const router = useRouter();
  const { isOpen, onOpenChange, onOpen } = useDisclosure(false);

  const searchParams = useSearchParams();
  const isReviewDone = project.isReviewDone;
  const isReviewDoneQuery = searchParams.get('isReviewDone') === 'true';

  const handleClickComplete = async () => {
    const { projectStatus } = await postCompleteProject(projectId);
    router.push(`/review-register/${projectId}?status=${projectStatus}`);
  };

  const handleClickShowReview = async () => {
    onOpen();
  };

  if (!project.host) return;

  return (
    <>
      <div className={cn('flex flex-col gap-2')}>
        {isReviewDone || isReviewDoneQuery ? (
          <BottomButton
            variant={'secondary'}
            size={'large'}
            label={'리뷰 확인하기'}
            onClick={handleClickShowReview}
          />
        ) : (
          <BottomButton
            variant={'secondary'}
            size={'large'}
            label={'프로젝트 완료하기'}
            onClick={handleClickComplete}
          />
        )}
        <HostInfo
          host={project.host}
          reviewId={project.reviewId}
          canViewReview={isReviewDone || isReviewDoneQuery}
        />

        <Guide guides={GuestProjectGuide.inProgress} />
      </div>
      {project.reviewId !== null && (
        <ReviewDialog
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          reviewId={project.reviewId}
        />
      )}
    </>
  );
};

export default GuestInProgressContent;
