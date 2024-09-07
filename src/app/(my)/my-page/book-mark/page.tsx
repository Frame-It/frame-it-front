import RecruitCard, {
  IRecruitCardProps,
} from '@/components/recruit/recruit-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { faker } from '@faker-js/faker';

interface IBookMarkPageProps {}

const BookMarkPage: React.FunctionComponent<IBookMarkPageProps> = () => {
  const bookMarkList: IRecruitCardProps[] = Array.from({ length: 5 }, () => {
    return {
      imageUrl: faker.image.urlPicsumPhotos(),
      type: '모델구인',
      title: faker.music.songName(),
      location: faker.location.city(),
      date: faker.date.anytime().toDateString(),
      tagList: Array.from({ length: 3 }, () => faker.music.genre()),
    };
  });
  return (
    <main
      className={cn(
        'h-full w-full',
        bookMarkList.length <= 0
          ? 'flex h-[calc(100dvh-60px)] items-center justify-center'
          : '',
      )}
    >
      {bookMarkList.length <= 0 ? (
        <section className="text-center">
          <div className="leading-[135%] text-gray-20">
            저장한 모집글이 없어요
          </div>
          <div className="text-sm leading-[150%]">
            마음에 드는 모집글을 북마크 해보세요!
          </div>
          <Button className="mx-auto mt-[9px] w-full bg-gray-20">
            북마크 하러가기
          </Button>
        </section>
      ) : (
        <ul className="mt-4 space-y-4">
          {bookMarkList.map((recruitInfo) => (
            <RecruitCard key={recruitInfo.imageUrl} {...recruitInfo} />
          ))}
        </ul>
      )}
    </main>
  );
};

export default BookMarkPage;
