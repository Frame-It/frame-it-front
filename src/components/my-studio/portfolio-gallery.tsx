'use client';

import { getMyPortfolios } from '@/service/client-actions/studio';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Masonry from 'react-responsive-masonry';

const MyStudioPortfolioGallery = ({ id }: { id?: number }) => {
  const { ref, inView } = useInView();
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['MyPortfolios', id],
    queryFn: ({ pageParam = 0, queryKey }) =>
      getMyPortfolios({ pageParam, id: queryKey[1] as number }),
    enabled: !!id,
    initialPageParam: 0,
    staleTime: 0,
    getNextPageParam: (lastPage: any) => {
      const { number, totalPages } = lastPage;
      return number + 1 < totalPages ? number + 1 : undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <section ref={ref} className="mt-[8px]">
      {data &&
      data.pages.some(
        (page) => page?.totalElements && page.totalElements > 0,
      ) ? (
        <Masonry columnsCount={2} gutter="10px">
          {data.pages.map(
            (page) =>
              page &&
              page.content.map((item) => (
                <img
                  onClick={() => router.push(`/portfolio-detail/${item.id}`)}
                  key={item.id}
                  src={item.portfolioImageUrl}
                  alt={item.title}
                  className="rounded-[8px]"
                  style={{ width: '100%', height: 'auto' }}
                />
              )),
          )}
        </Masonry>
      ) : (
        <div className="flex items-center justify-center">
          <div className="mt-[46px] space-y-1 text-center">
            <p className="text-[16px] font-[600] leading-[135%]">
              아직 등록된 포트폴리오가 없습니다.
            </p>
            <p className="text-[14px] leading-[150%] text-[#B4ADA9]">
              포트폴리오를 등록해 매력을 뽐내주세요!
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyStudioPortfolioGallery;
