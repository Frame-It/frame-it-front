'use client';

import Icon from '@/components/common/icon';
import LoadingSpinner from '@/components/common/loading-spinner';
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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { timeOptionLabels } from '@/constants/project';
import { cn } from '@/lib/utils';
import { useRecruitmentQuery } from '@/service/project-recruitment/use-service';
import { FC } from 'react';

interface ProjectRecruitmentDetailPageProps {
  params: {
    id: string;
  };
}

const ProjectRecruitmentDetailPage: FC<ProjectRecruitmentDetailPageProps> = ({
  params,
}) => {
  const projectId = parseInt(params.id, 10);
  const {
    data: projectData,
    isLoading,
    error,
  } = useRecruitmentQuery(projectId);

  if (isLoading) {
    return (
      <div className="flex h-full justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !projectData) {
    console.error('Failed to fetch recruit announcement:', error);
    return <div>Failed to load recruit announcement</div>;
  }

  const {
    title,
    description,
    shootingAt,
    address,
    detailedAddress,
    hostConcepts,
    tagList,
    retouchingDescription,
    host,
    conceptPhotoUrls,
    isHost,
    isBookmarked,
    timeOption,
    isClosed,
    viewCount,
  } = projectData;

  return (
    <main
      className={cn(
        'flex h-[calc(100%-64px)] flex-col gap-6 overflow-y-scroll px-4 pb-[29px] pt-4 text-gray-10',
      )}
    >
      <div>
        <div className="font-title-18 flex flex-col">{title}</div>
        <div className="font-body-16 flex items-center gap-1 pt-2.5 text-[#B7B5B4]">
          <Icon id={'view-icon-18'} className="stroke-[#B7B5B4]" size={18} />
          {viewCount}
        </div>
        <div className={cn('font-body-16 pt-6')}>{description}</div>
      </div>
      <div className={cn('font-title-18')}>
        촬영 일시
        <div className={cn('font-body-14 pt-2')}>
          {shootingAt} {timeOptionLabels[timeOption]}
        </div>
      </div>
      <div className={cn('font-title-18')}>
        촬영 장소
        <div className={cn('font-body-14 pt-2')}>
          {address} {detailedAddress}
        </div>
      </div>
      <div className={cn('font-title-18')}>
        촬영 컨셉
        <div className={cn('py-2')}>
          <TagList tags={tagList} size={'medium'} />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <ul className="flex w-full flex-col gap-y-4">
              {conceptPhotoUrls?.map((el, i) => (
                <li key={i}>
                  <img
                    src={el}
                    alt={'세부 이미지' + i}
                    className="w-full rounded-[8px] object-cover"
                  />
                </li>
              ))}
            </ul>
          </DialogTrigger>
          <DialogContent
            className="border-none bg-transparent px-[16px]"
            closeClassName="right-[24px] -top-[16px]"
            closeSize="w-[24px] h-[24px] text-white"
          >
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
          </DialogContent>
        </Dialog>
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
            isClosed={isClosed}
          />
        )}
      </div>
    </main>
  );
};

export default ProjectRecruitmentDetailPage;
