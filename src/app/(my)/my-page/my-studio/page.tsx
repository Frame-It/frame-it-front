import MySturioFilter from '@/components/my-studio/filter';
import MyStudioHeader from '@/components/my-studio/header';
import MyStudioIntroduce from '@/components/my-studio/introduce';
import MyStudioPortfolioGallery from '@/components/my-studio/portfolio-gallery';
import ProjectList from '@/components/my-studio/project-list';
import ReviewList from '@/components/my-studio/review-list';

import { getMyPage } from '@/service/server-actions/my-service';

export default async function MyStudioPage(params: {
  searchParams: { type: string };
}) {
  const {
    searchParams: { type },
  } = params;

  const queryString = type || 'portfolio';
  const myInfo = await getMyPage();

  return (
    <main className="h-[calc(100dvh-58px-63px)] overflow-y-auto px-[16px] py-[14px]">
      <MyStudioHeader
        profileUrl={myInfo?.profileImageUrl || ''}
        role={
          (myInfo?.identity?.toLowerCase() as 'model' | 'author') || 'model'
        }
        nickName={myInfo?.nickname || ''}
        portfolioCount={myInfo?.portfolioCount || 0}
        projectCount={myInfo?.projectCount || 0}
      />
      {/* 소개 글 */}
      <MyStudioIntroduce
        introduce={myInfo?.description || ''}
        tagList={myInfo?.concepts || []}
      />

      <MySturioFilter />

      {/* 포트폴리오 */}
      {queryString === 'portfolio' && (
        <MyStudioPortfolioGallery id={myInfo?.id} />
      )}

      {/* 프로젝트 */}
      {queryString === 'project' && <ProjectList />}

      {/* 리뷰 */}
      {queryString === 'review' && myInfo && <ReviewList id={myInfo.id} />}
    </main>
  );
}
