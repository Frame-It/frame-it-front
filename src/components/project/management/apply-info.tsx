'use client';

import Icon from '@/components/common/icon';
import useDisclosure from '@/hooks/useDisclosure';
import { ProjectMember } from '@/lib/api/project/project-management';
import { cn } from '@/lib/utils';
import { IActiveProject } from '@/types/project.type';
import { MyApplyItem, ProjectApplyGuestItem } from '../apply-member-item';

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
  partner: ProjectMember;
  applyContent: string;
  appliedAt: string;
} & Pick<IActiveProject, 'status' | 'id'>;

export const ProjectApplyGuest = ({
  partner,
  status,
  id: projectId,
  applyContent,
  appliedAt,
}: ProjectApplyGuestProps) => {
  return (
    <ApplyLayout title="프로젝트 게스트">
      <ProjectApplyGuestItem
        status={status}
        appliedAt={appliedAt}
        applyContent={applyContent}
        projectId={projectId}
        {...partner}
      />
    </ApplyLayout>
  );
};

type ApplyInfoProps = {
  principal: ProjectMember;
  appliedAt: string;
  applyContent: string;
} & Pick<IActiveProject, 'status' | 'id'>;

export const MyApplyInfo = ({
  principal,
  status,
  id,
  appliedAt,
  applyContent,
}: ApplyInfoProps) => {
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
          <MyApplyItem
            projectId={id}
            appliedAt={appliedAt}
            applyContent={applyContent}
            status={status}
            {...principal}
          />
        </div>
      )}
    </div>
  );
};
