'use client';

import BottomButton from '@/components/common/bottom-button';
import Drawer from '@/components/common/drawer';
import Guide from '@/components/common/guide';
import Icon from '@/components/common/icon';
import IconButton from '@/components/common/icon-button';
import { TagList } from '@/components/common/tag-list';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/components/ui/carousel';
import { Textarea } from '@/components/ui/textarea';
import { GuestProjectGuide } from '@/constants/guide';
import useDisclosure from '@/hooks/useDisclosure';
import { getRecruitAnnouncement } from '@/lib/api/project';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface ProjectRecruitmentDetailPageProps {
  params: {
    id: string;
  };
}

const ProjectRecruitmentDetailPage: FC<
  ProjectRecruitmentDetailPageProps
> = async ({ params }) => {
  const projectId = parseInt(params.id, 10);
  const projectData = await getRecruitAnnouncement(projectId);
  const userRole = 'HOST'; // TODO: 서버에서 보내줘야 할 듯

  const {
    title,
    description,
    shootingAt,
    spot,
    concepts,
    retouchingDescription,
    host,
    conceptPhotoUrls,
  } = projectData;

  return (
    <main
      className={cn(
        'flex h-[calc(100%-64px)] flex-col gap-6 overflow-y-scroll px-4 pb-[29px] pt-4 text-gray-10',
      )}
    >
      <div className={cn('font-title-18')}>
        {title}
        <div className={cn('font-body-16 pt-2')}>{description}</div>
      </div>
      <div className={cn('font-title-18')}>
        촬영 일시
        <div className={cn('font-body-14 pt-2')}>
          {new Date(shootingAt).toLocaleString()} {/* 날짜 형식 변환 */}
        </div>
      </div>
      <div className={cn('font-title-18')}>
        촬영 장소
        <div className={cn('font-body-14 pt-2')}>{spot}</div>
      </div>
      <div className={cn('font-title-18')}>
        촬영 컨셉
        <div className={cn('py-2')}>
          {<TagList tags={concepts} size={'medium'} />}
        </div>
        <Carousel>
          <CarouselContent>
            {conceptPhotoUrls.map((url: string, index: number) => (
              <CarouselItem
                key={index}
                className={cn('flex flex-col items-center justify-center')}
              >
                <div className={cn('w-full')}>
                  <img
                    src={url}
                    alt={'imagecarousel'}
                    className="h-[246px] w-[328px] rounded-[8px] object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="mt-[8px]" />
        </Carousel>
      </div>
      <div className={cn('font-title-18')}>
        보정 내용
        <div className={cn('font-body-14 pt-2')}>{retouchingDescription}</div>
      </div>
      <div className={cn('font-title-18 flex flex-col gap-2')}>
        작가
        <WriterInfo
          hostId={host.id}
          nickname={host.nickname}
          profileImageUrl={host.profileImageUrl}
          description={host.description}
          concepts={concepts}
        />
      </div>
      <div
        className={cn(
          'absolute bottom-0 left-0 flex h-[64px] w-full items-center justify-center gap-[8px] px-4',
        )}
      >
        {userRole === 'HOST' ? (
          <HostBottom projectId={projectId} />
        ) : (
          <GuestBottom title={title} projectId={projectId} />
        )}
      </div>
    </main>
  );
};

const HostBottom = ({ projectId }: { projectId: number }) => {
  const router = useRouter();
  return (
    <>
      <IconButton
        icon={<Icon id={'bookmark-icon'} size={24} className="text-gray-40" />}
      />
      <IconButton
        icon={<Icon id={'edit-icon'} size={24} className="text-gray-40" />}
      />
      <BottomButton
        variant={'secondary'}
        size={'large'}
        label={'신청자 리스트'}
        className="w-[222px]"
        onClick={() => router.push(`/project-management/${projectId}`)}
        // disabled={}
      />
    </>
  );
};

const GuestBottom = ({
  title,
  projectId,
}: {
  title: string;
  projectId: number;
}) => {
  return (
    <>
      <IconButton
        icon={<Icon id={'bookmark-icon'} size={24} className="text-gray-40" />}
      />
      <IconButton
        icon={<Icon id={'share-icon'} size={24} className="text-gray-40" />}
      />
      <ApplyDrawer title={title} projectId={projectId} />
    </>
  );
};

const ApplyDrawer = ({
  title,
  projectId,
}: {
  title: string;
  projectId: number;
}) => {
  const { isOpen, onOpenChange, onClose } = useDisclosure(false);

  return (
    <Drawer
      title={'지원하기'}
      open={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      trigger={
        <BottomButton
          variant={'primary'}
          size={'large'}
          label={'프로젝트 신청하기'}
          className="w-[222px]"
          // disabled={!isNextEnabled}
        />
      }
      className="pb-0"
    >
      <div className={cn('relative flex flex-col gap-3 pb-[74px]')}>
        <div className="font-body-14 flex items-center gap-2 self-stretch rounded-[8px] border-[1px] border-primary p-2 px-3 text-primary">
          {title}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className={cn('font-title-16 text-gray-10')}>
            작가님께 하고싶은 말
          </h1>
          <Textarea placeholder="자유롭게 적어주세요." />
        </div>
        <Guide title="지원 안내" guides={GuestProjectGuide.general} />
        <div
          className={cn(
            'absolute bottom-0 left-0 flex h-[64px] w-full items-center',
          )}
        >
          <BottomButton
            variant={'primary'}
            size={'large'}
            label={'신청 하기'}
          />
        </div>
      </div>
    </Drawer>
  );
};

interface WriterInfoProps {
  hostId: number;
  nickname: string;
  profileImageUrl: string | null;
  description: string;
  concepts: string[];
}

const WriterInfo: FC<WriterInfoProps> = ({
  hostId,
  nickname,
  profileImageUrl,
  description,
  concepts,
}) => {
  return (
    <section className="flex flex-col items-center justify-center gap-[10px] self-stretch rounded-[8px] bg-gray-90 px-[16px] pb-[18px] pt-[16px]">
      <div className="flex flex-col items-center justify-center gap-[6px] self-stretch">
        <img
          className="h-[64px] w-[64px] rounded-[8px]"
          src={profileImageUrl || '/png/profile.png'}
          alt={`${nickname}의 프로필 사진`}
        />
        <div className="font-body-14m">{nickname}</div>
      </div>
      <div className="flex flex-col items-center justify-center gap-[10px] self-stretch">
        <div className="font-body-14">{description}</div>
        <div>
          <TagList tags={concepts} size={'medium'} className="gap-[4px]" />
        </div>
      </div>
    </section>
  );
};

export default ProjectRecruitmentDetailPage;
