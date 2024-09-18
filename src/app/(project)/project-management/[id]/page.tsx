'use client';

import BottomButton from '@/components/common/bottom-button';
import Guide from '@/components/common/guide';
import { ApplicantList } from '@/components/project/applicant-list';
import { PartnerItem } from '@/components/project/partner-item';
import ProjectInfo from '@/components/project/project-info';
import ProjectProgress from '@/components/project/project-progress';
import ReviewDialog from '@/components/project/review-dialog';
import { GuestProjectGuide, HostProjectGuide } from '@/constants/guide';
import useDisclosure from '@/hooks/useDisclosure';
import { cn } from '@/lib/utils';
import { IApplyInfo, IProject } from '@/types/project';
import { faker } from '@faker-js/faker/locale/ko';
import { useRouter } from 'next/navigation';

const ProjectManagementDetailPage = () => {
  const userRole: 'HOST' | 'GUEST' = 'GUEST';

  return <HostContent />;
  return <GuestContent />;
};
const HostContent = () => {
  const router = useRouter();
  const { isOpen: isReviewDialogOpen, setIsOpen: setIsReviewDialogOpen } =
    useDisclosure(false);

  faker.seed(123);
  const project: IProject = {
    id: '1',
    date: '7/31',
    time: '12:00~14:00',
    location: '서울시 종로구',
    state: 'complete',
    title: '노들섬에서 촬영해 주세요',
  };

  const guest: IApplyInfo & Pick<IProject, 'state'> = {
    profileImage: faker.image.avatar(),
    name: faker.name.fullName(),
    applicationDate: faker.date.recent().toISOString().split('T')[0],
    content: faker.lorem.sentence(),
    state: project.state,
    partnerRole: 'GUEST',
  };

  const isReviewed = true;

  const handleClickReview = () => {
    if (isReviewed) {
      setIsReviewDialogOpen(true); // Open the review dialog
    } else {
      router.push('/review-register'); // Redirect to review register page
    }
  };

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto p-4">
      <ProjectInfo project={project} />
      <div className={cn('flex flex-col gap-2')}>
        <h1 className={cn('font-title-18 text-gray-20')}>진행상황</h1>
        <ProgressBox state={project.state} />
      </div>
      {project.state === 'inProgress' && (
        <BottomButton
          variant={'secondary'}
          size={'large'}
          label={'프로젝트 완료하기'}
        />
      )}
      {project.state === 'complete' && (
        <>
          <BottomButton
            variant={'secondary'}
            size={'large'}
            label={'리뷰 작성하기'}
            onClick={handleClickReview}
          />
          <ReviewDialog
            isOpen={isReviewDialogOpen}
            onOpenChange={setIsReviewDialogOpen}
          />
        </>
      )}
      {project.state === 'recruiting' ? (
        <ApplicantList />
      ) : (
        <ApplyInfo {...guest} />
      )}
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

const GuestContent = () => {
  faker.seed(234);

  const project: IProject = {
    id: '1',
    date: '7/31',
    time: '12:00~14:00',
    location: '서울시 종로구',
    state: 'complete',
    title: '노들섬에서 촬용해 주세요',
  };

  const host: IApplyInfo & Pick<IProject, 'state'> = {
    profileImage: faker.image.avatar(),
    name: faker.name.fullName(),
    applicationDate: faker.date.recent().toISOString().split('T')[0],
    content: faker.lorem.sentence(),
    state: project.state,
    partnerRole: 'HOST',
  };

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto p-4">
      <ProjectInfo project={project} />
      {project.state === 'recruiting' && (
        <BottomButton
          variant={'secondary'}
          size={'middle'}
          label={'호스트에게 DM'}
          className="max-w-none"
        />
      )}

      {project.state !== 'recruiting' && (
        <div className={cn('flex flex-col gap-2')}>
          <h1 className={cn('font-title-18 text-gray-20')}>진행상황</h1>
          <ProgressBox state={project.state} />
        </div>
      )}

      {project.state === 'inProgress' && (
        <div className={cn('flex flex-col gap-2')}>
          <BottomButton
            variant={'secondary'}
            size={'large'}
            label={'프로젝트 완료하기'}
          />
          <Guide guides={GuestProjectGuide.inProgress} />
        </div>
      )}
      {project.state === 'complete' && (
        <BottomButton
          variant={'secondary'}
          size={'large'}
          label={'리뷰 작성하기'}
        />
      )}
      {project.state === 'recruiting' ? (
        <ApplyInfo {...host} />
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
            <BottomButton
              variant={'stroke'}
              size={'small'}
              label={'호스트에게 DM하기'}
              className="font-tag-12 max-w-[126px]"
            />
          </div>
        </div>
      )}
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

const ProgressBox = ({ state }: { state: IProject['state'] }) => {
  return (
    <div
      className={cn(
        'flex h-[80px] justify-center rounded-[8px] border border-gray-80 pt-[26px]',
      )}
    >
      <ProjectProgress state={state} />
    </div>
  );
};

type ApplyInfoProps = IApplyInfo & Pick<IProject, 'state'>;

const ApplyInfo = (partner: ApplyInfoProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-3')}>
      <h1 className={cn('font-title-18 text-gray-20')}>
        {partner.partnerRole === 'HOST' ? '신청정보' : '프로젝트 게스트'}
      </h1>
      <PartnerItem {...partner} />
    </div>
  );
};

export default ProjectManagementDetailPage;
