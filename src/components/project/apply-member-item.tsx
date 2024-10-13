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
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    isOpen: isModalOpen,
    onOpenChange: onModalOpenChange,
    onClose: onModalClose,
    onOpen: onModalOpen,
  } = useDisclosure(false);

  const handleClickStart = async () => {
    try {
      await postStartProject(projectId, applicantId);
      const updatedSearchParams = new URLSearchParams(searchParams.toString());
      updatedSearchParams.set('status', 'IN_PROGRESS');
      onModalClose();
      router.replace(`?${updatedSearchParams.toString()}`);
    } catch (e) {
      alert(e);
    }
  };

  // TODO: DM
  return (
    <div className="flex w-full gap-[6px]">
      <BottomButton
        variant="stroke"
        size="small"
        label={'DM'}
        className="font-tag-12 max-w-none flex-1"
      />
      <Dialog open={isModalOpen} onOpenChange={onModalOpenChange}>
        <DialogTrigger asChild>
          <BottomButton
            variant="secondary"
            size="small"
            label={'프로젝트 시작하기'}
            className="font-tag-12 max-w-none flex-1"
            onClick={onModalOpen}
          />
        </DialogTrigger>
        <DialogContent className="flex w-[312px] flex-col gap-[6px] px-[12px] pb-[24px] pt-[32px]">
          <div
            className={cn(
              'font-title-16 flex flex-wrap items-start justify-center self-stretch',
            )}
          >
            {'프로젝트를\u00A0'}
            <span className="text-primary">시작</span>하시나요?
          </div>
          <p
            className={cn(
              'font-body-14 mb-4 flex justify-center self-stretch text-gray-20',
            )}
          >
            열린 프로젝트는 변경할 수 없습니다.
          </p>
          <BottomButton
            variant={'primary'}
            size={'middle'}
            label={'시작하기'}
            onClick={handleClickStart}
            className="max-w-none"
          />
        </DialogContent>
      </Dialog>
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
  const handleCancelApply = () => {};

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
