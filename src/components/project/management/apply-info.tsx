import { ProjectMember } from '@/lib/api/project/project-management';
import { cn } from '@/lib/utils';
import { ActiveStatus, IActiveProject } from '@/types/project.type';
import { MyApplyItem, ProjectApplyGuestItem } from '../apply-member-item';

interface ApplyLayoutProps {
  title: string;
  member: ProjectMember;
  status: ActiveStatus;
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
    <ApplyLayout title="프로젝트 게스트" member={partner} status={status}>
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
} & Pick<IActiveProject, 'status' | 'id'>;

export const MyApplyInfo = ({ principal, status, id }: ApplyInfoProps) => {
  return (
    <ApplyLayout title="신청정보" member={principal} status={status}>
      <MyApplyItem
        projectId={id}
        appliedAt={''}
        applyContent={'my'}
        status={status}
        {...principal}
      />
    </ApplyLayout>
  );
};
