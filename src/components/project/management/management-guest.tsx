import BottomButton from '@/components/common/bottom-button';
import Guide from '@/components/common/guide';
import { GuestProjectGuide } from '@/constants/guide';
import { cn } from '@/lib/utils';
import { ActiveStatus, IActiveProject, IApplyInfo } from '@/types/project.type';
import ProjectInfo from '../project-info';
import { GuestReviewDialogButton } from '../review/review-dialog-button';
import ProgressBox from './progress-box';

const ManagementGuest = ({
  id,
  status,
}: {
  id: number;
  status: ActiveStatus;
}) => {
  const project: IActiveProject & { reviewId: number | null } = {
    id: Number(id),
    shootingAt: '7/31T12:00:00',
    spot: '서울시 종로구',
    status: status as 'RECRUITING' | 'IN_PROGRESS' | 'COMPLETED',
    title: '노들섬에서 촬용해 주세요',
    timeOption: 'MORNING',
    isHost: false,
    reviewId: 1,
  };

  const host: Omit<IApplyInfo, 'reviewId'> &
    Pick<IActiveProject, 'status' | 'id'> = {
    profileImage: '',
    name: '',
    applicationDate: '',
    content: '',
    status: project.status,
    partnerRole: 'HOST',
    id: project.id,
    userId: 'userId',
  };

  const isReviewDone = true;

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto p-4">
      <ProjectInfo project={project} />
      {project.status === 'RECRUITING' && (
        <BottomButton
          variant={'secondary'}
          size={'middle'}
          label={'호스트에게 DM'}
          className="max-w-none"
        />
      )}

      {project.status !== 'RECRUITING' && (
        <div className={cn('flex flex-col gap-2')}>
          <h1 className={cn('font-title-18 text-gray-20')}>진행상황</h1>
          <ProgressBox status={project.status} />
        </div>
      )}

      {project.status === 'IN_PROGRESS' && (
        <div className={cn('flex flex-col gap-2')}>
          <BottomButton
            variant={'secondary'}
            size={'large'}
            label={'프로젝트 완료하기'}
          />
          <Guide guides={GuestProjectGuide.inProgress} />
        </div>
      )}
      {project.status === 'COMPLETED' && (
        <BottomButton
          variant={'secondary'}
          size={'large'}
          label={'리뷰 작성하기'}
        />
      )}
      {project.status === 'RECRUITING' ? (
        // <ApplyInfo {...host} />
        <div></div>
      ) : (
        <div className="flex flex-col gap-3">
          <h1 className={cn('font-title-18 text-gray-20')}>프로젝트 호스트</h1>
          <div className="flex items-center justify-between">
            <div className="flex gap-[10px] pb-2">
              <div className="flex-shrink-0">
                <img
                  src={host.profileImage}
                  alt={`${host.name}'s profile`}
                  className="h-[46px] w-[46px] rounded-[8px] object-cover"
                />
              </div>
              <div className="font-body-14m flex items-center">{host.name}</div>
            </div>
            <GuestReviewDialogButton
              // isReviewDone={isReviewDone}
              host={host}
              reviewId={project.reviewId}
            />
          </div>
        </div>
      )}
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

export default ManagementGuest;
