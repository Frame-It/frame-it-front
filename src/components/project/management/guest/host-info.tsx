import DMButton from '@/components/common/dm-button';

import { IProjectMember } from '@/lib/api/project/project.interface';
import { cn } from '@/lib/utils';
import ReviewCheckButton from '../../review/review-check-button';

export const HostInfo = ({
  host,
  reviewId,
  canViewReview,
}: {
  host: IProjectMember & {
    isReviewDone: boolean;
    reviewId: number | null;
  };
  reviewId: number | null;
  canViewReview: boolean;
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className={cn('font-title-18 text-gray-20')}>프로젝트 호스트</h1>
      <div className="flex items-center justify-between">
        <div className="flex gap-[10px] pb-2">
          <div className="flex-shrink-0">
            <img
              src={host.profileImageUrl ?? '/png/profile.png'}
              alt={`${host.nickname}'s profile`}
              className="h-[46px] w-[46px] rounded-[8px] object-cover"
            />
          </div>
          <div className="font-body-14m flex items-center">{host.nickname}</div>
        </div>
        <>
          {reviewId === null ? (
            <DMButton
              variant={'stroke'}
              size={'small'}
              label={'호스트에게 DM하기'}
              className="font-tag-12 max-w-[126px]"
              participantId={host.id}
            />
          ) : (
            <>
              <ReviewCheckButton
                variant={'stroke'}
                size={'small'}
                className="font-tag-12 max-w-[126px]"
                reviewId={reviewId}
                canViewReview={canViewReview}
              />
            </>
          )}
        </>
      </div>
    </div>
  );
};
