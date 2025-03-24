import DMButton from '@/components/common/dm-button';
import Guide from '@/components/common/guide';
import { GuestProjectGuide } from '@/constants/guide';
import {
  ICompletedProjectRes,
  IMyApplication,
  InProgressProjectRes,
  IProjectMember,
  IRecruitingProjectRes,
} from '@/lib/api/project/project.interface';
import { cn } from '@/lib/utils';
import {
  getCompletedProject,
  getInProgressProject,
  getRecruitingProject,
} from '@/service/project-management/service';
import { ActiveStatus, IActiveProject } from '@/types/project.type';
import ProjectInfo from '../project-info';
import { MyApplyInfo } from './apply-info';
import ProgressBox from './common/progress-box';
import GuestCompletedContent from './guest-completed';
import GuestInProgressContent from './guest-in-progress';

const ManagementGuest = async ({
  projectId,
  status,
}: {
  projectId: number;
  status: ActiveStatus;
}) => {
  let statusProject:
    | IRecruitingProjectRes
    | InProgressProjectRes
    | ICompletedProjectRes;

  if (status === 'RECRUITING') {
    statusProject = await getRecruitingProject(projectId, 'GUEST');
  } else if (status === 'IN_PROGRESS') {
    statusProject = await getInProgressProject(projectId, 'GUEST');
  } else {
    statusProject = await getCompletedProject(projectId, 'GUEST');
  }

  const project: IActiveProject = {
    status: statusProject.status,
    id: projectId,
    title: statusProject.title,
    shootingAt: statusProject.shootingAt,
    timeOption: statusProject.timeOption,
    address: statusProject.address,
    isHost: false,
  };

  const myApplication = (statusProject as IRecruitingProjectRes).myApplication;

  return (
    <ManagementGuestLayout project={project}>
      {status === 'RECRUITING' && myApplication && (
        <RecruitingContent
          projectId={projectId}
          myApplication={myApplication}
          project={statusProject as IRecruitingProjectRes}
        />
      )}
      {status === 'IN_PROGRESS' && (
        <GuestInProgressContent
          projectId={projectId}
          project={statusProject as unknown as InProgressProjectRes}
        />
      )}
      {status === 'COMPLETED' && (
        <GuestCompletedContent
          projectId={projectId}
          project={statusProject as unknown as ICompletedProjectRes}
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
  myApplication: IMyApplication;
  project: IRecruitingProjectRes;
}

const RecruitingContent = async ({
  projectId,
  myApplication,
  project,
}: RecruitingContentProps) => {
  const principal: IProjectMember = {
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
        principal={{
          appliedAt: myApplication.appliedAt,
          applyContent: myApplication.applyContent,
          ...principal,
        }}
        id={projectId}
      />
    </>
  );
};

export default ManagementGuest;
