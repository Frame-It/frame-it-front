'use client';

import BottomButton from '@/components/common/bottom-button';
import Guide from '@/components/common/guide';
import { HostProjectGuide } from '@/constants/guide';
import useDisclosure from '@/hooks/useDisclosure';
import {
  InProgressProject,
  postCompleteProject,
} from '@/lib/api/project/project-management';
import { useRouter, useSearchParams } from 'next/navigation';
import ReviewDialog from '../review/review-dialog';
import { ProjectApplyGuest } from './apply-info';

interface HostInProgressContentProps {
  projectId: number;
  project: InProgressProject;
}

const HostInProgressContent = ({
  projectId,
  project,
}: HostInProgressContentProps) => {
  const router = useRouter();
  const { isOpen, onOpenChange, onOpen } = useDisclosure(false);
  const searchParams = useSearchParams();
  const isReviewDoneQuery = searchParams.get('isReviewDone') === 'true';

  const { isReviewDone, reviewId } = project;

  const handleClickComplete = async () => {
    const { projectStatus } = await postCompleteProject(projectId);

    router.replace(
      `/review-register/${projectId}?status=${projectStatus}&isHost=true`,
    );
  };

  const handleClickShowReview = async () => {
    onOpen();
  };
  if (!project.guest) return;

  return (
    <>
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
      <Guide guides={HostProjectGuide.inProgress} />
      <ProjectApplyGuest
        partner={project.guest}
        id={projectId}
        status={'IN_PROGRESS'}
        applyContent={project.applyContent}
        appliedAt={project.appliedAt}
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

export default HostInProgressContent;
