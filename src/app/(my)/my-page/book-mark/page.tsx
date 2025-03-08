import BookMarkCard, {
  IRecruitCardProps,
} from '@/components/my-page/bookmark/bookmark-card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PROJECT_CONCEPTS } from '@/constants/project';
import { IRecruitRes } from '@/lib/api/project/project.interface';
import { cn } from '@/lib/utils';
import { getUserBookMarks } from '@/service/bookmark/service';

const BookMarkPage = async () => {
  const data = await getUserBookMarks();
  const bookMarkList = data?.map((item: IRecruitRes) => ({
    id: item.id,
    imageUrl: item.previewImageUrl,
    type: item.recruitmentRole,
    title: item.title,
    location: item.address,
    date: new Date(item.shootingAt).toDateString(),
    tagList: item.concepts.map((v) =>
      PROJECT_CONCEPTS.find((concept) => concept.id === v),
    ),
    isBookmarked: item.isBookmarked,
  }));

  return (
    <ScrollArea
      className={cn('h-[calc(100vh-58px)] px-4 xl:h-[calc(800px-58px)]')}
    >
      {bookMarkList?.length === 0 ? (
        <section className="flex h-full min-h-[500px] flex-col items-center justify-center">
          <div className="font-title-16 text-gray-20">
            저장한 모집글이 없어요
          </div>
          <div className="text-sm leading-[150%]">
            마음에 드는 모집글을 북마크 해보세요!
          </div>
          <Button className="mx-auto mt-[9px] w-full max-w-[217px] bg-gray-20">
            북마크 하러가기
          </Button>
        </section>
      ) : (
        <ul className="my-4 space-y-4">
          {bookMarkList?.map((recruitInfo: IRecruitCardProps) => (
            <BookMarkCard key={recruitInfo.id} {...recruitInfo} />
          ))}
        </ul>
      )}
    </ScrollArea>
  );
};

export default BookMarkPage;
