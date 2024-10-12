'use client';

import useDisclosure from '@/hooks/useDisclosure';
import {
  ProjectMember,
  postStartProject,
} from '@/lib/api/project/project-management';
import { cn } from '@/lib/utils';
import { ActiveStatus } from '@/types/project.type';
import { useRouter, useSearchParams } from 'next/navigation';
import BottomButton from '../common/bottom-button';
import ReviewDialog from './review/review-dialog';

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

type ApplyMemberItemProps = ProjectMember & {
  status: ActiveStatus;
} & {
  appliedAt: string;
  applyContent: string;
} & {
  projectId: number;
};

type ProjectApplyGuestItemProps = ApplyMemberItemProps & { reviewId?: number };

export const ProjectApplyGuestItem = (props: ProjectApplyGuestItemProps) => {
  return (
    <ApplyUserLayout
      profileImageUrl={props.profileImageUrl || '/png/profile.png'}
      nickname={props.nickname}
      appliedAt={props.appliedAt}
      applyContent={props.applyContent}
    >
      <ProjectApplyGuestButtons
        status={props.status}
        projectId={props.projectId}
        nickname={props.nickname}
        reviewId={props.reviewId}
        applicantId={props.id}
      />
    </ApplyUserLayout>
  );
};

export const MyApplyItem = (props: ApplyMemberItemProps) => {
  return (
    <ApplyUserLayout
      profileImageUrl={props.profileImageUrl || '/png/profile.png'}
      nickname={props.nickname}
      appliedAt={props.appliedAt}
      applyContent={props.applyContent}
    >
      <MyApplyButton projectId={props.projectId} />
    </ApplyUserLayout>
  );
};

interface ProjectApplyGuestButtonsProps {
  status: ActiveStatus;
  projectId: number;
  nickname: string;
  reviewId?: number;
  applicantId: number;
}

const ProjectApplyGuestButtons = ({
  status,
  projectId,
  nickname,
  reviewId,
  applicantId,
}: ProjectApplyGuestButtonsProps) => {
  return (
    <ProjectApplyGuestButtonsLayout>
      {status === 'COMPLETED' && (
        <CompletedButtons reviewId={reviewId} nickname={nickname} />
      )}
      {status === 'RECRUITING' && (
        <RecruitingButtons projectId={projectId} applicantId={applicantId} />
      )}
      {status === 'IN_PROGRESS' && <InProgressButtons projectId={projectId} />}
    </ProjectApplyGuestButtonsLayout>
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
  // TODO: project start
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleClickStart = async () => {
    try {
      await postStartProject(projectId, applicantId);
      const updatedSearchParams = new URLSearchParams(searchParams.toString());
      updatedSearchParams.set('status', 'IN_PROGRESS');

      router.replace(`?${updatedSearchParams.toString()}`);
    } catch (e) {
      alert(e);
    }
  };

  // TODO: DM
  return (
    <div className="flex gap-[6px]">
      <BottomButton
        variant="stroke"
        size="small"
        label={'DM'}
        className="font-tag-12 max-w-none flex-1"
      />
      <BottomButton
        variant="secondary"
        size="small"
        label={'프로젝트 시작하기'}
        className="font-tag-12 max-w-none flex-1"
        onClick={handleClickStart}
      />
    </div>
  );
};

interface InProgressButtonsProps {
  projectId: number;
}

const InProgressButtons = ({ projectId }: InProgressButtonsProps) => {
  // TODO: DM

  return (
    <BottomButton
      variant="stroke"
      size="small"
      label={'DM'}
      className="font-tag-12 max-w-none flex-1"
    />
  );
};

interface MyApplyButtonProps {
  projectId: number;
}

const MyApplyButton = ({ projectId }: MyApplyButtonProps) => {
  // TODO: 신청 취소

  return (
    <div className="flex gap-[6px]">
      <BottomButton
        variant="stroke"
        size="small"
        label={'신청 취소하기'}
        className="font-tag-12 max-w-none flex-1"
      />
    </div>
  );
};

interface CompletedButtonsProps {
  reviewId?: number;
  nickname: string;
}

const CompletedButtons = ({ reviewId, nickname }: CompletedButtonsProps) => {
  const { isOpen, onToggle } = useDisclosure(false);

  // TODO: 내가 리뷰 작성하지 않았으면 리뷰 확인하기 disabled
  return (
    <>
      <BottomButton
        variant={'stroke'}
        size={'small'}
        label={'리뷰 확인하기'}
        className="font-tag-12 max-w-none flex-1"
        onClick={onToggle}
      />
      {reviewId && (
        <ReviewDialog
          reviewId={reviewId}
          name={nickname}
          isOpen={isOpen}
          onOpenChange={onToggle}
        />
      )}
    </>
  );
};
