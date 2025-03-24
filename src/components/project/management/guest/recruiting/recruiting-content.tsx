import DMButton from '@/components/common/dm-button';
import { IProjectMember } from '@/lib/api/project/project.interface';
import { getRecruitingProject } from '@/service/project-management/service';
import { IActiveProject } from '@/types/project.type';
import { MyApplyInfo } from '../../common/apply-info';
import ManagementGuestLayout from '../guest-layout';

interface RecruitingContentProps {
  projectId: number;
}

const RecruitingContent = async ({ projectId }: RecruitingContentProps) => {
  const statusProject = await getRecruitingProject(projectId, 'GUEST');

  const myApplication = statusProject.myApplication;

  if (!myApplication) return;

  const principal: IProjectMember = {
    id: myApplication.applicantId,
    nickname: myApplication.nickname,
    profileImageUrl: myApplication.profileImageUrl,
  };

  const project: IActiveProject = {
    status: statusProject.status,
    id: projectId,
    title: statusProject.title,
    shootingAt: statusProject.shootingAt,
    timeOption: statusProject.timeOption,
    address: statusProject.address,
    isHost: false,
  };

  return (
    <ManagementGuestLayout project={project}>
      {statusProject.hostId && (
        <DMButton
          variant={'secondary'}
          size={'middle'}
          label={'호스트에게 DM'}
          className="max-w-none"
          participantId={statusProject.hostId}
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
    </ManagementGuestLayout>
  );
};

export default RecruitingContent;
