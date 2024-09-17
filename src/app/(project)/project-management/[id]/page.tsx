'use client';

import BottomButton from '@/components/common/bottom-button';
import Guide from '@/components/common/guide';
import Icon from '@/components/common/icon';
import ProjectInfo from '@/components/project/project-info';
import ProjectProgress from '@/components/project/project-progress';
import { HostProjectGuide } from '@/constants/guide';
import useDisclosure from '@/hooks/useDisclosure';
import { cn } from '@/lib/utils';
import { IProject } from '@/types/project';
import { faker } from '@faker-js/faker/locale/ko';

const ProjectManagementDetailPage = () => {
  const userRole: 'HOST' | 'GUEST' = 'GUEST';

  // return <HostContent />;
  return <GuestContent />;
};

const HostContent = () => {
  faker.seed(123);

  const project: IProject = {
    id: '1',
    date: '7/31',
    time: '12:00~14:00',
    location: '서울시 종로구',
    state: 'recruiting',
    title: '노들섬에서 촬용해 주세요',
  };

  const guest: IApplyInfo & Pick<IProject, 'state'> = {
    profileImage: faker.image.avatar(),
    name: faker.name.fullName(),
    applicationDate: faker.date.recent().toISOString().split('T')[0],
    content: faker.lorem.sentence(),
    state: project.state,
    partnerRole: 'GUEST',
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
        <BottomButton
          variant={'secondary'}
          size={'large'}
          label={'리뷰 작성하기'}
        />
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
          <Guide
            guides={[
              '호스트와 게스트 모두가 ‘프로젝트 완료’를 눌러야 프로젝트가 정상 완료됩니다.',
              '프로젝트를 완료하면 변경할 수 없습니다.',
            ]}
          />
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

const ApplicantList = () => {
  const { isOpen, onToggle } = useDisclosure(false);
  const applicants = Array.from({ length: 3 }).map(() => ({
    profileImage: faker.image.avatar(),
    name: faker.name.fullName(),
    applicationDate: faker.date.recent().toISOString().split('T')[0],
    content: faker.lorem.sentence(),
  }));
  return (
    <div className={cn('flex w-full flex-col')}>
      <div className={cn('flex w-full justify-between')}>
        <h1 className={cn('font-title-18 text-gray-20')}>신청자 리스트</h1>
        <Icon
          id={isOpen ? 'arrow-up-icon' : 'arrow-down-icon'}
          size={24}
          onClick={onToggle}
          className={cn('text-gray-40')}
        />
      </div>
      {isOpen && (
        <div className="mt-4 flex-1 divide-y divide-gray-80">
          {applicants.map((applicant, index) => (
            <PartnerItem
              key={index}
              profileImage={applicant.profileImage}
              name={applicant.name}
              applicationDate={applicant.applicationDate}
              content={applicant.content}
              state={'recruiting'}
              partnerRole="GUEST"
            />
          ))}
        </div>
      )}
    </div>
  );
};

type UserRole = 'HOST' | 'GUEST';

interface IApplyInfo {
  profileImage: string;
  name: string;
  applicationDate: string;
  content: string;
  partnerRole: UserRole;
}

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

const PartnerItem: React.FunctionComponent<ApplyInfoProps> = ({
  profileImage,
  name,
  applicationDate,
  content,
  state,
  partnerRole,
}) => {
  return (
    <div className="flex gap-[10px] py-4">
      <div className="flex-shrink-0">
        <img
          src={profileImage}
          alt={`${name}'s profile`}
          className="h-[46px] w-[46px] rounded-[8px] object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 justify-between">
          <h3 className="font-body-14m text-gray-20">{name}</h3>
          <span className="font-caption-12 text-gray-40">
            신청일 {applicationDate}
          </span>
        </div>
        <p className="font-body-14 mb-2 mt-1 text-gray-40">{content}</p>
        {partnerRole === 'HOST' ? (
          <GuestPartnerButtons />
        ) : (
          <HostPartnerButtons state={state} />
        )}
      </div>
    </div>
  );
};

const HostPartnerButtons = ({ state }: { state: IProject['state'] }) => {
  return (
    <div className="flex gap-[6px]">
      {state === 'complete' ? (
        <BottomButton
          variant={'stroke'}
          disabled
          size={'small'}
          label={'리뷰 확인하기'}
          className="font-tag-12 max-w-none flex-1"
        />
      ) : (
        <BottomButton
          variant="stroke"
          size="small"
          label={'DM'}
          className="font-tag-12 max-w-none flex-1"
        />
      )}
      {state === 'recruiting' && (
        <BottomButton
          variant="secondary"
          size="small"
          label={'프로젝트 시작하기'}
          className="font-tag-12 max-w-none flex-1"
        />
      )}
    </div>
  );
};

const GuestPartnerButtons = () => {
  return (
    <div className="flex gap-[6px]">
      <BottomButton
        variant="stroke"
        size="small"
        label={'신청 취소하기'}
        className="font-tag-12 max-w-none flex-1"
      />
    </div>
  );
};

export default ProjectManagementDetailPage;
