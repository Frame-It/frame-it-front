'use client';

import { IStartedProjectGuest } from '@/lib/api/project/project.interface';
import { cn } from '@/lib/utils';
import { ActiveStatus, IProject } from '@/types/project.type';
import { useRouter } from 'next/navigation';
import BottomButton from '../../../common/bottom-button';
import DMButton from '../../../common/dm-button';
import ReviewCheckButton from '../../review/review-check-button';
import ProjectStartButton from './project-start-button';

interface ApplyMemberItemLayoutProps {
  profileImageUrl: string;
  nickname: string;
  appliedAt: string;
  applyContent: string;
  children: React.ReactNode;
}

const ApplyUserLayout = ({
  profileImageUrl,
  nickname,
  children,
  appliedAt,
  applyContent,
}: ApplyMemberItemLayoutProps) => {
  return (
    <div className="flex gap-[10px] py-4">
      <div className="flex-shrink-0">
        <img
          src={profileImageUrl || '/png/profile.png'}
          alt={`${nickname}'s profile`}
          className="h-[46px] w-[46px] rounded-[8px] object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 justify-between">
          <h3 className="font-body-14m text-gray-20">{nickname}</h3>
          <span className="font-caption-12 text-gray-40">
            신청일 {appliedAt}
          </span>
        </div>
        <p className="font-body-14 mb-2 mt-1 text-gray-40">{applyContent}</p>
        {children}
      </div>
    </div>
  );
};

type ApplyMemberItemProps = {
  guest: IStartedProjectGuest;
  projectId: number;
};

export const RecruitingProjectApplyGuestItem = ({
  guest,
  projectId,
}: {
  projectId: IProject['id'];
  guest: Omit<IStartedProjectGuest, 'reviewId' | 'isReviewDone'>;
}) => {
  return (
    <ApplyUserLayout
      profileImageUrl={guest.profileImageUrl || '/png/profile.png'}
      nickname={guest.nickname}
      appliedAt={guest.appliedAt}
      applyContent={guest.applyContent}
    >
      <RecruitingButtons projectId={projectId} applicantId={guest.id} />
    </ApplyUserLayout>
  );
};

export const StartedProjectApplyGuestItem = ({
  guest,
  status,
  projectId,
}: ApplyMemberItemProps & {
  status: Exclude<ActiveStatus, 'RECRUITING'>;
}) => {
  return (
    <ApplyUserLayout
      profileImageUrl={guest.profileImageUrl || '/png/profile.png'}
      nickname={guest.nickname}
      appliedAt={guest.appliedAt}
      applyContent={guest.applyContent}
    >
      {status === 'IN_PROGRESS' && (
        <InProgressButtons applicantId={guest.id} projectId={projectId} />
      )}
      {status === 'COMPLETED' && (
        <CompletedButtons guestReviewId={guest.reviewId} />
      )}
    </ApplyUserLayout>
  );
};

export const MyApplyItem = ({
  guest,
  projectId,
}: {
  projectId: number;
  guest: Omit<IStartedProjectGuest, 'reviewId' | 'isReviewDone'>;
}) => {
  return (
    <ApplyUserLayout
      profileImageUrl={guest.profileImageUrl || '/png/profile.png'}
      nickname={guest.nickname}
      appliedAt={guest.appliedAt}
      applyContent={guest.applyContent}
    >
      <MyApplyButton projectId={projectId} />
    </ApplyUserLayout>
  );
};

interface ProjectApplyGuestButtonsLayoutProps {
  children: React.ReactNode;
}

const ProjectApplyGuestButtonsLayout = ({
  children,
}: ProjectApplyGuestButtonsLayoutProps) => {
  return <div className={cn('flex gap-[6px]')}>{children}</div>;
};

interface RecruitingButtonsProps {
  projectId: number;
  applicantId: number;
}

const RecruitingButtons = ({
  projectId,
  applicantId,
}: RecruitingButtonsProps) => {
  return (
    <ProjectApplyGuestButtonsLayout>
      <div className="flex w-full gap-[6px]">
        <DMButton
          variant="stroke"
          size="small"
          label={'DM'}
          className="font-tag-12 max-w-none flex-1"
          participantId={applicantId}
        />
        <ProjectStartButton projectId={projectId} applicantId={applicantId} />
      </div>
    </ProjectApplyGuestButtonsLayout>
  );
};

interface InProgressButtonsProps {
  applicantId: number;
  projectId: number;
}

const InProgressButtons = ({ applicantId }: InProgressButtonsProps) => {
  return (
    <ProjectApplyGuestButtonsLayout>
      <DMButton
        variant="stroke"
        size="small"
        label={'DM'}
        className="font-tag-12 max-w-none flex-1"
        participantId={applicantId}
      />
    </ProjectApplyGuestButtonsLayout>
  );
};

interface CompletedButtonsProps {
  guestReviewId: number | null;
}

const CompletedButtons = ({ guestReviewId }: CompletedButtonsProps) => {
  return (
    <ProjectApplyGuestButtonsLayout>
      <ReviewCheckButton
        variant={'stroke'}
        size={'small'}
        className="font-tag-12 max-w-none flex-1"
        canViewReview={guestReviewId === null}
        reviewId={guestReviewId}
      />
    </ProjectApplyGuestButtonsLayout>
  );
};

interface MyApplyButtonProps {
  projectId: number;
}

const MyApplyButton = ({ projectId }: MyApplyButtonProps) => {
  const router = useRouter();

  const handleCancelApply = () => {
    router.push(`/project-management/cancel-register/${projectId}`);
  };

  return (
    <div className="flex gap-[6px]">
      <BottomButton
        variant="stroke"
        size="small"
        label={'신청 취소하기'}
        className="font-tag-12 max-w-none flex-1"
        onClick={handleCancelApply}
      />
    </div>
  );
};
