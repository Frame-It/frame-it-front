import Guide from '@/components/common/guide';
import { GuestProjectGuide } from '@/constants/guide';
import { cn } from '@/lib/utils';
import { IActiveProject } from '@/types/project.type';
import ProjectInfo from '../../project-info';
import ProgressBox from '../common/progress-box';

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

export default ManagementGuestLayout;
