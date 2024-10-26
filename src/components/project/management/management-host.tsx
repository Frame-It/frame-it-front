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
import ReviewCheckButton from '../review/review-check-button';
import ReviewWriteButton from '../review/review-write-button';
import { ApplicantList } from './applicant-list';
import { StartedProjectApplyGuest } from './apply-info';
import HostInProgressContent from './host-in-progress';
import ProgressBox from './progress-box';

interface HostContentProps {
  projectId: number;
  status: ActiveStatus;
}
const ManagementHost = async ({ projectId, status }: HostContentProps) => {
  let statusProject: RecruitingProject | InProgressProject | CompletedProject;

  if (status === 'RECRUITING') {
    statusProject = await getRecruitingProject(projectId, 'HOST');
  } else if (status === 'IN_PROGRESS') {
    statusProject = await getInProgressProject(projectId, 'HOST');
  } else {
    statusProject = await getCompletedProject(projectId, 'HOST');
  }

  const project: IActiveProject = {
    status: statusProject.status,
    id: projectId,
    title: statusProject.title,
    shootingAt: statusProject.shootingAt,
    timeOption: statusProject.timeOption,
    spot: statusProject.spot,
    isHost: true,
  };

  return (
    <ManagementHostLayout project={project}>
      {status === 'RECRUITING' && <RecruitingContent projectId={projectId} />}
      {status === 'IN_PROGRESS' && (
        <HostInProgressContent
          projectId={projectId}
          project={statusProject as InProgressProject}
        />
      )}
      {status === 'COMPLETED' && <CompletedContent projectId={projectId} />}
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

interface CompletedContentProps {
  projectId: number;
}

const CompletedContent = async ({ projectId }: CompletedContentProps) => {
  const { guest, reviewId } = await getCompletedProject(projectId, 'HOST');
  const isReviewDone = reviewId !== null;

  if (!guest) return;

  return (
    <>
      {isReviewDone ? (
        <ReviewCheckButton
          reviewId={reviewId}
          canViewReview={true}
          variant={'secondary'}
          size={'large'}
        />
      ) : (
        <ReviewWriteButton
          projectId={projectId}
          status={'COMPLETED'}
          variant={'secondary'}
          size={'large'}
        />
      )}
      <StartedProjectApplyGuest
        status={'COMPLETED'}
        guest={guest}
        id={projectId}
        applyContent={guest.applyContent}
        appliedAt={guest.appliedAt}
      />
    </>
  );
};

export default ManagementHost;
