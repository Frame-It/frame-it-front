'use client';

import BottomButton, {
  BottomButtonProps,
} from '@/components/common/bottom-button';
import { ActiveStatus } from '@/types/project.type';
import { useRouter } from 'next/navigation';

const ReviewWriteButton = ({
  projectId,
  status,
  ...props
}: {
  projectId: number;
  status: Exclude<ActiveStatus, 'RECRUITING'>;
} & Pick<BottomButtonProps, 'variant' | 'size'>) => {
  const router = useRouter();
  const handleClickReview = () => {
    router.push(`/review-register/${projectId}?status=${status}`);
  };

  return (
    <BottomButton
      label={'리뷰 작성하기'}
      onClick={handleClickReview}
      {...props}
    />
  );
};

export default ReviewWriteButton;
