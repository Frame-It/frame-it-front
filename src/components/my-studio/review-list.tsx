import { getMyReviews } from '@/service/server-actions/studio';
import { Textarea } from '../ui/textarea';
import { cn } from '@/lib/utils';

interface IReviewListProps {
  id: number;
}

const ReviewList = async ({ id }: IReviewListProps) => {
  const reviewList = await getMyReviews(id);

  return (
    <section>
      {reviewList.length <= 0 && (
        <div className="mt-[48px] text-center">
          <div className="font-semibold leading-[135%] text-gray-20">
            아직 작성된 리뷰가 없습니다.
          </div>
          <div className="text-sm leading-[150%] text-gray-60">
            프로젝트를 완료하면 리뷰를 받을 수 있어요!
          </div>
        </div>
      )}

      <ul className="space-y-4">
        {reviewList.map((review, i) => (
          <li
            key={review.reviewerNickname + i}
            className={cn(
              'pb-[16px]',
              i === reviewList.length - 1
                ? ''
                : 'border border-l-0 border-r-0 border-t-0 border-b-gray-80',
            )}
          >
            <div className="text-lg font-semibold leading-[135%]">
              {review.reviewerNickname}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-[6px]">
              {review.tags.map((tag, i) => (
                <span
                  key={i + tag}
                  className="inline-flex items-center justify-center rounded-[8px] bg-gray-90 p-2 text-xs text-gray-10"
                >
                  {tag}
                </span>
              ))}
            </div>
            {review.content && (
              <Textarea
                readOnly
                className="mt-[10px] resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                value={review.content}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ReviewList;
