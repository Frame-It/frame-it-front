'use client';

import Icon from '@/components/common/icon';
import useDisclosure from '@/hooks/useDisclosure';

import { IStartedProjectGuest } from '@/lib/api/project/project.interface';
import { cn } from '@/lib/utils';
import { IActiveProject, IStartedProject } from '@/types/project.type';
import { MyApplyItem, StartedProjectApplyGuestItem } from './apply-member-item';

interface ApplyLayoutProps {
  title: string;
  children: React.ReactNode;
}

const ApplyLayout = ({ title, children }: ApplyLayoutProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-3')}>
      <h1 className={cn('font-title-18 text-gray-20')}>{title}</h1>
      {children}
    </div>
  );
};

type ProjectApplyGuestProps = {
  guest: IStartedProjectGuest;
  applyContent: string;
  appliedAt: string;
} & Pick<IStartedProject, 'status' | 'id'>;

export const StartedProjectApplyGuest = ({
  guest,
  status,
  id: projectId,
}: ProjectApplyGuestProps) => {
  return (
    <ApplyLayout title="프로젝트 게스트">
      <StartedProjectApplyGuestItem
        guest={guest}
        status={status}
        projectId={projectId}
      />
    </ApplyLayout>
  );
};

type ApplyInfoProps = {
  principal: Omit<IStartedProjectGuest, 'reviewId' | 'isReviewDone'>;
} & Pick<IActiveProject, 'id'>;

export const MyApplyInfo = ({ principal }: ApplyInfoProps) => {
  const { isOpen, onToggle } = useDisclosure(false);

  return (
    <div className={cn('flex w-full flex-col')}>
      <div className={cn('flex w-full justify-between')}>
        <h1 className={cn('font-title-18 text-gray-20')}>신청정보</h1>
        <Icon
          id={isOpen ? 'arrow-up-icon' : 'arrow-down-icon'}
          size={24}
          onClick={onToggle}
          className={cn('text-gray-40')}
        />
      </div>
      {isOpen && (
        <div className="flex-1 divide-y divide-gray-80">
          <MyApplyItem projectId={principal.id} guest={principal} />
        </div>
      )}
    </div>
  );
};
