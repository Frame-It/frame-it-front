'use client';

import BookMarkCard from '@/components/my-page/bookmark/bookmark-card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PROJECT_CONCEPTS } from '@/constants/project';
import { IRecruitResponse } from '@/lib/api/project/project-recruitment';
import { cn } from '@/lib/utils';
import { getBookMarks } from '@/service/client-actions/bookmark';
import { useQuery } from '@tanstack/react-query';

const BookMarkPage = () => {
  const { data: bookMarkList, isLoading } = useQuery({
    queryKey: ['getBookMarks'],
    queryFn: getBookMarks,
    select: (data) => {
      return data?.map((item: IRecruitResponse) => ({
        id: item.id,
        imageUrl: item.previewImageUrl,
        type: item.recruitmentRole,
        title: item.title,
        location: item.spot,
        date: new Date(item.shootingAt).toDateString(),
        tagList: item.concepts.map((v) =>
          PROJECT_CONCEPTS.find((concept) => concept.id === v),
        ),
        isBookmarked: item.isBookmarked,
      }));
    },
  });

  console.log(bookMarkList);

  return (
    <ScrollArea
      className={cn('h-[calc(100vh-58px)] px-4 xl:h-[calc(800px-58px)]')}
    >
      {bookMarkList?.length === 0 ? (
        <section className="flex h-full flex-col items-center justify-center">
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
          {bookMarkList?.map((recruitInfo: any) => (
            <BookMarkCard key={recruitInfo.id} {...recruitInfo} />
          ))}
        </ul>
      )}
    </ScrollArea>
  );
};

export default BookMarkPage;
