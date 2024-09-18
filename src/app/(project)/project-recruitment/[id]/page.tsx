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
import { generateRandomImageList } from '@/lib/faker';
import { cn } from '@/lib/utils';
import { faker } from '@faker-js/faker/locale/ko';

const ProjectRecruitmentDetailPage = () => {
  faker.seed(101);
  const imageArr = Array.from({ length: 3 }, () => generateRandomImageList());

  const projectId = 1;
  const title = faker.music.songName();
  const body = faker.lorem.sentence();
  const time = faker.date.anytime();
  const location = faker.address.streetAddress();
  const tags = Array.from({ length: 3 }, () => faker.lorem.word());
  const retouchingDetails = faker.lorem.paragraph();

  return (
    <main
      className={cn(
        'flex h-[calc(100%-64px)] flex-col gap-6 overflow-y-scroll px-4 pb-[29px] pt-4 text-gray-10',
      )}
    >
      <div className={cn('font-title-18')}>
        {title}
        <div className={cn('font-body-16 pt-2')}>{body}</div>
      </div>
      <div className={cn('font-title-18')}>
        촬영 일시
        <div className={cn('font-body-14 pt-2')}>{time.toLocaleString()}</div>
      </div>
      <div className={cn('font-title-18')}>
        촬영 장소
        <div className={cn('font-body-14 pt-2')}>{location}</div>
      </div>
      <div className={cn('font-title-18')}>
        촬영 컨셉
        <div className={cn('py-2')}>
          {<TagList tags={tags} size={'medium'} />}
        </div>
        <Carousel>
          <CarouselContent>
            {imageArr.map((image) => (
              <CarouselItem
                key={image.id}
                className={cn('flex flex-col items-center justify-center')}
              >
                <div className={cn('w-full')}>
                  <img
                    src={image.url}
                    alt={'imagecarousel'}
                    // fill
                    // priority
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
        <div className={cn('font-body-14 pt-2')}>{retouchingDetails}</div>
      </div>
      <div className={cn('font-title-18')}>
        작가
        <WriterInfo />
      </div>
      <div
        className={cn(
          'absolute bottom-0 left-0 flex h-[64px] w-full items-center justify-center gap-[8px] px-4',
        )}
      >
        <IconButton
          icon={
            <Icon id={'bookmark-icon'} size={24} className="text-gray-40" />
          }
        />
        <IconButton
          icon={<Icon id={'share-icon'} size={24} className="text-gray-40" />}
        />
        <ApplyDrawer title={title} projectId={projectId} />
      </div>
    </main>
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

const WriterInfo = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-[10px] self-stretch rounded-[8px] bg-gray-90 px-[16px] pb-[18px] pt-[16px]">
      <div className="flex flex-col items-center justify-center gap-[6px] self-stretch">
        <img
          className="h-[64px] w-[64px] rounded-[8px]"
          src={faker.image.url()}
        />
        <div className="font-body-14m">재치있는카피바라</div>
      </div>
      <div className="flex flex-col items-center justify-center gap-[10px] self-stretch">
        <div className="font-body-14">기억이 남는 사진을 찍고 싶습니다...</div>
        <div>
          <TagList
            tags={['청량', '야외', '풍경사진']}
            size={'medium'}
            className="gap-[4px]"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectRecruitmentDetailPage;
