'use client';

import { ITag, REVIEW_TAGS } from '@/constants/project';
import { getProjectReview } from '@/lib/api/project/project-review';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import ConceptTag from '../../common/concept-tag';
import Icon from '../../common/icon';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';

interface ReviewDialogProps {
  trigger?: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  reviewId: number;
  isMine?: boolean;
}

const ReviewDialog = ({
  trigger,
  isOpen,
  onOpenChange,
  reviewId,
  isMine = false,
}: ReviewDialogProps) => {
  const [tags, setTags] = useState<ITag['id'][] | null>(null);
  const [content, setContent] = useState('');
  const [reviewerNickname, setReviewerNickname] = useState('');

  useEffect(() => {
    if (tags?.length && content) return;
    (async () => {
      try {
        const review = await getProjectReview(reviewId);
        console.log(review);
        setTags(review.tags);
        setContent(review.content);
        setReviewerNickname(review.reviewerNickname);
      } catch (error) {
        console.error('Error fetching review:', error);
      }
    })();
  }, [reviewId]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[312px] gap-3 p-[18px]">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="font-title-18 text-gray-20">
            {isMine ? (
              '나'
            ) : (
              <span className="text-primary">{reviewerNickname}</span>
            )}
            의 리뷰
          </DialogTitle>
          <DialogClose asChild>
            <Icon className="h-6 w-6 text-gray-40" id={'close-icon'} />
          </DialogClose>
        </DialogHeader>
        <div
          className={cn(
            'flex flex-wrap content-start items-start gap-[6px] self-stretch',
          )}
        >
          {tags?.map((tag: ITag['id']) => (
            <ConceptTag
              key={tag}
              id={tag}
              label={
                REVIEW_TAGS.find((reviewTag) => reviewTag.id === tag)?.label ??
                ''
              }
              isSelected={true}
            />
          ))}
        </div>
        <p
          className={cn(
            'font-body-14 flex max-h-[127px] min-h-[83px] items-start self-stretch rounded-md border border-gray-60 p-3 text-gray-20',
          )}
        >
          {content}
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
