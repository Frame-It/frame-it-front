'use client';

import BottomButton from '@/components/common/bottom-button';
import ConceptTag from '@/components/common/concept-tag';
import Guide from '@/components/common/guide';
import { AutosizeTextarea } from '@/components/ui/auto-size-textarea';
import { REVIEW_TAGS } from '@/constants/project';
import { postProjectReview } from '@/lib/api/project/project-review';
import {
  ICompletedProjectRes,
  InProgressProjectRes,
} from '@/lib/api/project/project.interface';
import { cn } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ProjectInfo from '../project-info';

const ReviewRegister = ({
  project,
  projectId,
  revieweeId,
}: {
  project: InProgressProjectRes | ICompletedProjectRes;
  projectId: number;
  revieweeId: number;
}) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reviewContent, setReviewContent] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleTag = (id: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(id)
        ? prevSelectedTags.filter((tagId) => tagId !== id)
        : [...prevSelectedTags, id],
    );
  };

  const handleComplete = async () => {
    try {
      const { projectStatus } = await postProjectReview({
        projectId,
        content: reviewContent,
        tags: selectedTags,
        revieweeId,
      });

      const newParams = new URLSearchParams(searchParams);
      newParams.set('complete', 'true');
      newParams.set('status', projectStatus);
      router.push(`?${newParams.toString()}`);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="relative flex h-full flex-col p-4">
      <div className="flex h-[calc(100%-50px)] flex-col gap-4 overflow-auto scrollbar-hide">
        <ProjectInfo project={project} />
        <div>
          <h2 className="font-title-16 text-gray-10">어떤 점이 좋았나요?</h2>
          <p className="font-body-14 mb-[8px] mt-[2px] text-gray-40">
            1개 이상 선택해 주세요.
          </p>
          <div
            className={cn(
              'flex flex-wrap content-start items-start gap-2 self-stretch',
            )}
          >
            {REVIEW_TAGS.map((tag) => (
              <ConceptTag
                key={tag.id}
                id={tag.id}
                label={tag.label}
                isSelected={selectedTags.includes(tag.id)}
                onToggle={toggleTag}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <h2 className="font-title-16 text-gray-10">
              구체적인 리뷰를 작성해주세요.
            </h2>
            <p className="font-body-14 mt-[2px] text-gray-40">
              최소 10글자 이상 작성해주세요.
            </p>
          </div>
          <AutosizeTextarea
            minHeight={63}
            placeholder="ex) 친절하게 잘해주세요! 구도도 도와주십니다 :)"
            value={reviewContent}
            onChange={(e) => setReviewContent(e.target.value)}
          />
          <Guide
            guides={[
              '작성한 리뷰는 상대방의 스튜디오 화면에 표출됩니다.',
              '상대방에게 도움이 될 수 있는 피드백을 부탁드립니다.',
              '피드백과 관계없는 무분별한 욕설, 비속어 등의 사용은 제재를 당할 수 있습니다.',
            ]}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 flex h-[64px] w-full items-center px-4">
        <BottomButton
          variant={'primary'}
          size={'large'}
          label={'작성완료'}
          onClick={handleComplete}
          disabled={selectedTags.length === 0 || reviewContent.length < 10}
        />
      </div>
    </div>
  );
};

export default ReviewRegister;
