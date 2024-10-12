import BottomButton from '@/components/common/bottom-button';
import Guide from '@/components/common/guide';
import { HostProjectGuide } from '@/constants/guide';
import {
  CompletedProject,
  InProgressProject,
  RecruitingProject,
  getCompletedProject,
  getInProgressProject,
  getRecruitingProject,
} from '@/lib/api/project/project-management';
import { cn } from '@/lib/utils';
import { ActiveStatus, IActiveProject } from '@/types/project.type';
import ProjectInfo from '../project-info';
import { HostReviewDialogButton } from '../review/review-dialog-button';
import { ApplicantList } from './applicant-list';
import { ProjectApplyGuest } from './apply-info';
import ProgressBox from './progress-box';

interface HostContentProps {
  id: number;
  status: ActiveStatus;
}
const ManagementHost = async ({ id, status }: HostContentProps) => {
  let statusProject: RecruitingProject | InProgressProject | CompletedProject;

  if (status === 'RECRUITING') {
    statusProject = await getRecruitingProject(id, 'HOST');
  } else if (status === 'IN_PROGRESS') {
    statusProject = await getInProgressProject(id, 'HOST');
  } else {
    statusProject = await getCompletedProject(id);
  }

  const project: IActiveProject = {
    status: statusProject.status,
    id,
    title: statusProject.title,
    shootingAt: statusProject.shootingAt,
    timeOption: statusProject.timeOption,
    spot: statusProject.spot,
    isHost: true,
  };

  return (
    <ManagementHostLayout project={project}>
      {status === 'RECRUITING' && <RecruitingContent projectId={id} />}
      {status === 'IN_PROGRESS' && (
        <InProgressContent
          projectId={id}
          project={statusProject as InProgressProject}
        />
      )}
      {status === 'COMPLETED' && <CompletedContent projectId={id} />}
    </ManagementHostLayout>
  );
};

interface ManagementHostLayoutProps {
  project: IActiveProject;
  children: React.ReactNode;
}

const ManagementHostLayout = ({
  project,
  children,
}: ManagementHostLayoutProps) => {
  return (
    <div className="flex h-full flex-col gap-4 overflow-auto p-4">
      <ProjectInfo project={project} />
      <div className={cn('flex flex-col gap-2')}>
        <h1 className={cn('font-title-18 text-gray-20')}>진행상황</h1>
        <ProgressBox status={project.status} />
      </div>
      {children}
      <div className="flex flex-col gap-2">
        <h1 className={cn('font-title-18 text-gray-20')}>프로젝트 조정</h1>
        <Guide
          title="프로젝트 안내"
          guides={HostProjectGuide.general}
          collapsible
        />
        <Guide
          title="프로젝트 취소 안내"
          guides={HostProjectGuide.cancellation}
          collapsible
        />
      </div>
    </div>
  );
};

interface RecruitingContentProps {
  projectId: number;
}

const RecruitingContent = async ({ projectId }: RecruitingContentProps) => {
  const project = await getRecruitingProject(projectId, 'HOST');

  const { applicants } = project;

  if (!applicants) return null;

  return <ApplicantList applicantList={applicants} projectId={projectId} />;
};

interface InProgressContentProps {
  projectId: number;
  project: InProgressProject;
}

const InProgressContent = async ({
  projectId,
  project,
}: InProgressContentProps) => {
  // TODO: project 완료

  return (
    <>
      <BottomButton
        variant={'secondary'}
        size={'large'}
        label={'프로젝트 완료하기'}
      />
      <Guide guides={HostProjectGuide.inProgress} />
      <ProjectApplyGuest
        partner={project.guest}
        id={projectId}
        status={'IN_PROGRESS'}
        applyContent={project.applyContent}
        appliedAt={project.appliedAt}
      />
    </>
  );
};

interface CompletedContentProps {
  projectId: number;
}

const CompletedContent = async ({ projectId }: CompletedContentProps) => {
  // TODO: completed project api call

  const { projectMember, reviewId } = await getCompletedProject(projectId);

  return (
    <>
      <HostReviewDialogButton
        projectId={projectId}
        guest={projectMember}
        reviewId={reviewId}
      />
      <ProjectApplyGuest
        status={'COMPLETED'}
        partner={projectMember}
        id={projectId}
        applyContent={''}
        appliedAt={''}
      />
    </>
  );
};

export default ManagementHost;
