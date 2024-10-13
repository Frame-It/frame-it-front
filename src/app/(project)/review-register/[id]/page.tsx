import BottomButton from '@/components/common/bottom-button';
import ReviewRegister from '@/components/project/review/review-register';
import {
  CompletedProject,
  InProgressProject,
  getCompletedProject,
  getInProgressProject,
} from '@/lib/api/project/project-management';
import { ActiveStatus } from '@/types/project.type';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface ReviewRegisterPageProps {
  params: { id: string };
  searchParams: {
    complete?: string;
    status?: Exclude<ActiveStatus, 'CANCELED' | 'RECRUITING'>;
  };
}

const ReviewRegisterPage = async ({
  params,
  searchParams,
}: ReviewRegisterPageProps) => {
  const { id } = params;
  const isComplete = searchParams.complete === 'true';

  if (!id || searchParams.status === undefined) {
    redirect('/404');
  }

  let statusProject: InProgressProject | CompletedProject;
  const projectId = Number(id);
  const status = searchParams.status;

  if (status === 'IN_PROGRESS') {
    statusProject = await getInProgressProject(projectId, 'HOST');
  } else {
    statusProject = await getCompletedProject(projectId);
  }
  console.log(statusProject);

  return isComplete ? (
    <Complete projectId={Number(id)} />
  ) : (
    <ReviewRegister
      project={statusProject}
      projectId={Number(id)}
      revieweeId={statusProject.guest.id}
    />
  );
};

const Complete = ({ projectId }: { projectId: number }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[9px]">
      <div className="flex flex-col items-center gap-1">
        <h1 className="font-title-16 text-gray-20">리뷰작성 완료</h1>
        <p className="font-body-14 text-gray-60">
          프로젝트를 통해 한 단계 성장했어요!
        </p>
      </div>

      <Link
        href={`/project-management/${projectId}?status=${'IN_PROGRESS'}&isHost=${'true'}`}
        className="w-[217px]"
      >
        <BottomButton
          variant={'secondary'}
          size={'middle'}
          label={'프로젝트 리뷰 보러가기'}
          className="font-button-14"
        />
      </Link>
      <Link href={'/'} className="w-[217px]">
        <BottomButton
          variant={'stroke'}
          size={'middle'}
          label={'홈으로'}
          className="font-button-14"
        />
      </Link>

      <div className="h-[58px]" />
    </div>
  );
};

export default ReviewRegisterPage;
