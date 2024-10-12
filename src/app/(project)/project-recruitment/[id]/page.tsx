import { TagList } from '@/components/common/tag-list';
import {
  GuestBottom,
  HostBottom,
} from '@/components/project/recruitment/recruitment-bottom';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/components/ui/carousel';
import { IProjectConcept, PROJECT_CONCEPTS } from '@/constants/project';
import { getRecruitAnnouncement } from '@/lib/api/project';
import { cn } from '@/lib/utils';
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
          {
            <TagList
              tags={concepts.map((conceptId: string) =>
                PROJECT_CONCEPTS.find((v) => v.id === conceptId),
              )}
              size={'medium'}
            />
          }
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
          // TODO: host의 concepts 필요
          concepts={[]}
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

interface WriterInfoProps {
  hostId: number;
  nickname: string;
  profileImageUrl: string | null;
  description: string;
  concepts: IProjectConcept[];
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
          <TagList tags={[]} size={'medium'} className="gap-[4px]" />
        </div>
      </div>
    </section>
  );
};

export default ProjectRecruitmentDetailPage;
