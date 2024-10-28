import MySturioFilter from '@/components/my-studio/filter';
import MyStudioHeader from '@/components/my-studio/header';
import MyStudioIntroduce from '@/components/my-studio/introduce';
import MyStudioPortfolioGallery from '@/components/my-studio/portfolio-gallery';
import ProjectList from '@/components/my-studio/project-list';
import ReviewList from '@/components/my-studio/review-list';

import { getGuestStudio } from '@/service/server-actions/studio';
import { headers } from 'next/headers';

export default async function StudioDetailPage(params: {
  searchParams: { type: string };
}) {
  const {
    searchParams: { type },
  } = params;

  const queryString = type || 'portfolio';
  const headersList = headers();
  const headerPathname = headersList.get('x-pathname') || '';
  const id = headerPathname.split('/').at(-1);

  const guestStudioInfo = await getGuestStudio(id);

  return (
    <main className="h-[calc(100dvh-58px-63px)] overflow-y-auto px-[16px] py-[14px]">
      <MyStudioHeader
        profileUrl={guestStudioInfo?.profileImageUrl || ''}
        role={
          (guestStudioInfo?.identity?.toLowerCase() as 'model' | 'author') ||
          'model'
        }
        nickName={guestStudioInfo?.nickname || ''}
        portfolioCount={guestStudioInfo?.portfolioCount || 0}
        projectCount={guestStudioInfo?.projectCount || 0}
      />
      <MyStudioIntroduce
        introduce={guestStudioInfo?.description || ''}
        tagList={guestStudioInfo?.concepts || []}
        isGuest
      />
      <MySturioFilter />
      {/* 포트폴리오 */}
      {queryString === 'portfolio' && (
        <MyStudioPortfolioGallery id={guestStudioInfo.id} />
      )}

      {/* 프로젝트 */}
      {queryString === 'project' && <ProjectList id={guestStudioInfo.id} />}

      {/* 리뷰 */}
      {queryString === 'review' && guestStudioInfo && (
        <ReviewList id={guestStudioInfo.id} />
      )}
    </main>
  );
}
