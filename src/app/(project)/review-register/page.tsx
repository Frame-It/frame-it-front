'use client';

import BottomButton from '@/components/common/bottom-button';
import ConceptTag from '@/components/common/concept-tag';
import Guide from '@/components/common/guide';
import ProjectInfo from '@/components/project/project-info';
import { AutosizeTextarea } from '@/components/ui/auto-size-textarea';
import { PROJECT_CONCEPTS } from '@/constants/project';
import { cn } from '@/lib/utils';
import { IProject } from '@/types/project.type';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const ReviewRegisterPage = () => {
  const searchParams = useSearchParams();
  const isComplete = searchParams.get('complete') === 'true';

  return isComplete ? <Complete /> : <Register />;
};

const Register = () => {
  const project: Omit<IProject, 'timeOption' | 'isHost' | 'status'> = {
    id: 1,
    shootingAt: '7/31T12:00:00',
    // time: '12:00~14:00',
    spot: '서울시 종로구',
    title: '노들섬에서 촬용해 주세요',
  };
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (id: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(id)
        ? prevSelectedTags.filter((tagId) => tagId !== id)
        : [...prevSelectedTags, id],
    );
  };

  const handleComplete = () => {};

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
            {PROJECT_CONCEPTS.map((tag) => (
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

      <Link
        className="absolute bottom-0 left-0 flex h-[64px] w-full items-center px-4"
        href={'?complete=true'}
      >
        <BottomButton
          variant={'primary'}
          size={'large'}
          label={'작성완료'}
          onClick={handleComplete}
        />
      </Link>
    </div>
  );
};

const Complete = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[9px]">
      <div className="flex flex-col items-center gap-1">
        <h1 className="font-title-16 text-gray-20">리뷰작성 완료</h1>
        <p className="font-body-14 text-gray-60">
          프로젝트를 통해 한 단계 성장했어요!
        </p>
      </div>
      {/* TODO: 프로젝트 id로 이동 */}
      <Link href={'/project-management/1'} className="w-[217px]">
        <BottomButton
          variant={'secondary'}
          size={'middle'}
          label={'프로젝트 리뷰 보러가기'}
          className="font-button-14"
        />
      </Link>
      <Link href={'/'} className="w-[217px]">
        <BottomButton
          variant={'stroke'}
          size={'middle'}
          label={'홈으로'}
          className="font-button-14"
        />
      </Link>

      <div className="h-[58px]" />
    </div>
  );
};

export default ReviewRegisterPage;
