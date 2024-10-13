import BottomButton from '@/components/common/bottom-button';
import Guide from '@/components/common/guide';
import { GuestProjectGuide } from '@/constants/guide';
import { InProgressProject } from '@/lib/api/project/project-management';
import { cn } from '@/lib/utils';
import { HostInfo } from './host-info';

interface GuestInProgressContentProps {
  projectId: number;
  project: InProgressProject;
}

const GuestInProgressContent = ({
  projectId,
  project,
}: GuestInProgressContentProps) => {
  if (!project.host) return;
  // TODO: 프로젝트 완료하기
  return (
    <>
      <div className={cn('flex flex-col gap-2')}>
        <BottomButton
          variant={'secondary'}
          size={'large'}
          label={'프로젝트 완료하기'}
        />
        <HostInfo host={project.host} reviewId={project.reviewId} />

        <Guide guides={GuestProjectGuide.inProgress} />
      </div>
    </>
  );
};

export default GuestInProgressContent;
