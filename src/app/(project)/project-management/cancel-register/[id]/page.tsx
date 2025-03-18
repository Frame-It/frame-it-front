import CancelRegister from '@/components/project/cancel/cancel-register';
import ProjectInfo from '@/components/project/project-info';
import { cn } from '@/lib/utils';
import { getRecruitingProject } from '@/service/project-management/service';

interface CancelRegisterPageProps {
  params: { id: string };
}

const CancelRegisterPage = async ({
  params: { id },
}: CancelRegisterPageProps) => {
  const projectId = Number(id);
  if (!id) return null;

  const project = await getRecruitingProject(projectId, 'GUEST');
  return (
    <div
      className={cn('flex h-full flex-col gap-4 overflow-auto p-4 pb-[9px]')}
    >
      <ProjectInfo project={project} />
      <CancelRegister projectId={projectId} />
    </div>
  );
};

export default CancelRegisterPage;
