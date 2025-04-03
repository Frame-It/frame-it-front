import Guide from '@/components/common/guide';
import { HostProjectGuide } from '@/constants/guide';
import { cn } from '@/lib/utils';
import { IActiveProject } from '@/types/project.type';
import ProjectInfo from '../../project-info';
import ProgressBox from '../common/progress-box';

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

export default ManagementHostLayout;
