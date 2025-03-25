import { getRecruitingProject } from '@/service/project-management/service';
import { IActiveProject } from '@/types/project.type';
import ManagementHostLayout from '../host-layout';
import { ApplicantList } from './applicant-list';

interface RecruitingContentProps {
  projectId: number;
}

const RecruitingContent = async ({ projectId }: RecruitingContentProps) => {
  const statusProject = await getRecruitingProject(projectId, 'HOST');
  const { applicants } = statusProject;

  const project: IActiveProject = {
    status: statusProject.status,
    id: projectId,
    title: statusProject.title,
    shootingAt: statusProject.shootingAt,
    timeOption: statusProject.timeOption,
    address: statusProject.address,
    isHost: true,
  };

  return (
    <ManagementHostLayout project={project}>
      {applicants && (
        <ApplicantList applicantList={applicants} projectId={projectId} />
      )}
    </ManagementHostLayout>
  );
};

export default RecruitingContent;
