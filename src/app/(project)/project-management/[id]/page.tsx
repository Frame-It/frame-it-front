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
  faker.seed(123);

  // TODO: host, guest 구분
  const project: IProject = {
    id: '1',
    date: '7/31',
    time: '12:00~14:00',
    location: '서울시 종로구',
    state: 'complete',
    title: '노들섬에서 촬용해 주세요',
  };

  const guest: IGuest & Pick<IProject, 'state'> = {
    profileImage: faker.image.avatar(),
    name: faker.name.fullName(),
    applicationDate: faker.date.recent().toISOString().split('T')[0],
    content: faker.lorem.sentence(),
    state: project.state,
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
        <ProjectGuest {...guest} />
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
        <div className="mt-4 flex-1 space-y-4">
          {applicants.map((applicant, index) => (
            <GuestItem
              key={index}
              profileImage={applicant.profileImage}
              name={applicant.name}
              applicationDate={applicant.applicationDate}
              content={applicant.content}
              state={'recruiting'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface IGuest {
  profileImage: string;
  name: string;
  applicationDate: string;
  content: string;
}
type GuestProps = IGuest & Pick<IProject, 'state'>;

const ProjectGuest = (guest: GuestProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-3')}>
      <h1 className={cn('font-title-18 text-gray-20')}>프로젝트 게스트</h1>
      <GuestItem {...guest} />
    </div>
  );
};

const GuestItem: React.FunctionComponent<GuestProps> = ({
  profileImage,
  name,
  applicationDate,
  content,
  state,
}) => {
  return (
    <div className="flex gap-[10px] rounded-[8px] border border-gray-80 p-4">
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
      </div>
    </div>
  );
};

export default ProjectManagementDetailPage;
