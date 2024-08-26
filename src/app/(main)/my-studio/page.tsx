import MySturioFilter from '@/components/my-studio/filter';
import MyStudioHeader from '@/components/my-studio/header';
import MyStudioIntroduce from '@/components/my-studio/introduce';
import MyStudioPortfolioGallery from '@/components/my-studio/portfolio-gallery';

import { generateRandomImageList } from '@/lib/faker';
import { faker } from '@faker-js/faker';

export default function MyStudioPage(params: {
  searchParams: { type: string };
}) {
  const {
    searchParams: { type },
  } = params;

  const queryString = type || 'portfolio';

  // 쿼리스트링에 따라 다른 데이터를 패칭
  const imageArr = Array.from({ length: 10 }, () => generateRandomImageList());

  return (
    <main className="px-[16px] py-[1px]">
      <MyStudioHeader profileUrl={faker.image.urlPicsumPhotos()} role="model" />
      {/* 소개 글 */}
      <MyStudioIntroduce
        introduce="소개글이요. 저는 이런사람 입니다. 묵찌빠를 전공하였고 전공을살려
        홈프로텍터로 일하는 중이며 세계 제일의 사진사가 될겁니다."
        tagList={['아름다운', '이쁜', '날렵한', '감성적인', '사랑스러운']}
      />

      <MySturioFilter />

      {/* 포트폴리오 */}
      {queryString === 'portfolio' && (
        <MyStudioPortfolioGallery imageArr={imageArr} />
      )}

      {/* 프로젝트 */}

      {/* 리뷰 */}
    </main>
  );
}
