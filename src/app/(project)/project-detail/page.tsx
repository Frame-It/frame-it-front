import { TagList } from '@/components/common/tag-list';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/components/ui/carousel';
import { generateRandomImageList } from '@/lib/faker';
import { cn } from '@/lib/utils';
import { faker } from '@faker-js/faker/locale/ko';

const ProjectDetailPage = () => {
  const imageArr = Array.from({ length: 3 }, () => generateRandomImageList());

  const title = faker.music.songName();
  const body = faker.lorem.sentence();
  const time = faker.date.anytime();
  const location = faker.address.streetAddress();
  const tags = Array.from({ length: 3 }, () => faker.lorem.word());
  const retouchingDetails = faker.lorem.paragraph();

  return (
    <div
      className={cn(
        'flex flex-col gap-6 overflow-y-scroll px-4 pb-[29px] pt-4 text-gray-10',
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
    </div>
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

export default ProjectDetailPage;
