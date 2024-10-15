import DMButton from '@/components/common/dm-button';
import Guide from '@/components/common/guide';
import { GuestProjectGuide } from '@/constants/guide';
import {
  CompletedProject,
  InProgressProject,
  MyApplication,
  ProjectMember,
  RecruitingProject,
  getCompletedProject,
  getInProgressProject,
  getRecruitingProject,
} from '@/lib/api/project/project-management';
import { cn } from '@/lib/utils';
import { ActiveStatus, IActiveProject } from '@/types/project.type';
import ProjectInfo from '../project-info';
import { MyApplyInfo } from './apply-info';
import GuestCompletedContent from './guest-completed';
import GuestInProgressContent from './guest-in-progress';
import ProgressBox from './progress-box';

const ManagementGuest = async ({
  id,
  status,
}: {
  id: number;
  status: ActiveStatus;
}) => {
  let statusProject: RecruitingProject | InProgressProject | CompletedProject;

  if (status === 'RECRUITING') {
    statusProject = await getRecruitingProject(id, 'GUEST');
  } else if (status === 'IN_PROGRESS') {
    statusProject = await getInProgressProject(id, 'GUEST');
  } else {
    statusProject = await getCompletedProject(id, 'GUEST');
  }

  const project: IActiveProject = {
    status: statusProject.status,
    id,
    title: statusProject.title,
    shootingAt: statusProject.shootingAt,
    timeOption: statusProject.timeOption,
    spot: statusProject.spot,
    isHost: false,
  };

  const myApplication = (statusProject as RecruitingProject).myApplication;

  return (
    <ManagementGuestLayout project={project}>
      {status === 'RECRUITING' && myApplication && (
        <RecruitingContent
          projectId={id}
          status={'RECRUITING'}
          myApplication={myApplication}
          project={statusProject as RecruitingProject}
        />
      )}
      {status === 'IN_PROGRESS' && (
        <GuestInProgressContent
          projectId={id}
          project={statusProject as InProgressProject}
        />
      )}
      {status === 'COMPLETED' && (
        <GuestCompletedContent
          projectId={id}
          project={statusProject as CompletedProject}
        />
      )}
    </ManagementGuestLayout>
  );
};

interface ManagementGuestLayoutProps {
  project: IActiveProject;
  children: React.ReactNode;
}

const ManagementGuestLayout = ({
  project,
  children,
}: ManagementGuestLayoutProps) => {
  return (
    <div className="flex h-full flex-col gap-4 overflow-auto p-4">
      <ProjectInfo project={project} />
      {project.status !== 'RECRUITING' && (
        <div className={cn('flex flex-col gap-2')}>
          <h1 className={cn('font-title-18 text-gray-20')}>진행상황</h1>
          <ProgressBox status={project.status} />
        </div>
      )}
      {children}
      <div className="flex flex-col gap-2">
        <h1 className={cn('font-title-18 text-gray-20')}>프로젝트 조정</h1>
        <Guide
          title="프로젝트 안내"
          guides={GuestProjectGuide.general}
          collapsible
        />
        <Guide
          title="프로젝트 취소 안내"
          guides={GuestProjectGuide.cancellation}
          collapsible
        />
      </div>
    </div>
  );
};

interface RecruitingContentProps {
  projectId: number;
  status: ActiveStatus;
  myApplication: MyApplication;
  project: RecruitingProject;
}

const RecruitingContent = async ({
  projectId,
  status,
  myApplication,
  project,
}: RecruitingContentProps) => {
  const principal: ProjectMember = {
    id: myApplication.applicantId,
    nickname: myApplication.nickname,
    profileImageUrl: myApplication.profileImageUrl,
  };
  return (
    <>
      {project.hostId && (
        <DMButton
          variant={'secondary'}
          size={'middle'}
          label={'호스트에게 DM'}
          className="max-w-none"
          participantId={project.hostId}
        />
      )}
      <MyApplyInfo
        principal={principal}
        id={projectId}
        status={status}
        appliedAt={myApplication.appliedAt}
        applyContent={myApplication.applyContent}
      />
    </>
  );
};

export default ManagementGuest;
