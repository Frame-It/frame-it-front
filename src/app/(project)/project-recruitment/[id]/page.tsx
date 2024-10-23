import { TagList } from '@/components/common/tag-list';
import HostInfo from '@/components/project/recruitment/host-info';
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
import { PROJECT_CONCEPTS } from '@/constants/project';
import { getRecruitAnnouncement } from '@/lib/api/project/project-recruitment';
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

  const {
    title,
    description,
    shootingAt,
    spot,
    hostConcepts,
    projectConcepts,
    retouchingDescription,
    host,
    conceptPhotoUrls,
    isHost,
    isBookmarked,
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
              tags={projectConcepts.map((conceptId: string) =>
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
        {host.identity === 'PHOTOGRAPHER' ? '작가' : '모델'}
        <HostInfo
          hostId={host.id}
          nickname={host.nickname}
          profileImageUrl={host.profileImageUrl}
          description={host.description}
          concepts={hostConcepts}
        />
      </div>
      <div
        className={cn(
          'absolute bottom-0 left-0 flex h-[64px] w-full items-center justify-center gap-[8px] px-4',
        )}
      >
        {isHost ? (
          <HostBottom projectId={projectId} isBookmarked={isBookmarked} />
        ) : (
          <GuestBottom
            title={title}
            projectId={projectId}
            hostIdentity={host.identity}
            isBookmarked={isBookmarked}
          />
        )}
      </div>
    </main>
  );
};

export default ProjectRecruitmentDetailPage;
