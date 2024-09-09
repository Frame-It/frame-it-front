'use client';

import BottomButton from '@/components/common/bottom-button';
import ConceptTag from '@/components/common/concept-tag';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useProjectRegisterStore } from '@/store/project-regist-store';
import { faker } from '@faker-js/faker/locale/ko';
import { useState } from 'react';

const generateTags = () => {
  return Array.from({ length: 10 }, (_, index) => ({
    id: index,
    label: faker.lorem.word(),
  }));
};

const StepTwo: React.FC = () => {
  const [conceptTags] = useState(generateTags);
  const { setProjectInfo, projectInfo, nextStep } = useProjectRegisterStore();
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const [photoFiles, setPhotoFiles] = useState<File[] | null>([]);

  const [description, setDescription] = useState<string>('');
  const [retouchingDetails, setRetouchingDetails] = useState('');
  const handleTagToggle = (id: number) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(id)
        ? prevSelectedTags.filter((tagId) => tagId !== id)
        : [...prevSelectedTags, id],
    );
  };

  const isNextEnabled = selectedTags.length && description && retouchingDetails;

  const handleNext = () => {
    if (isNextEnabled) {
      setProjectInfo({
        ...projectInfo,
        conceptTags: selectedTags.map((v, i) => conceptTags[i].label),
        description,
        retouchingDetails,
      });
      // nextStep();
    } else {
      alert('컨셉 태그와 프로젝트 설명을 입력해주세요.');
    }
  };

  return (
    <div className={cn('flex h-full flex-1 flex-col justify-between')}>
      <div className={cn('flex flex-col gap-4')}>
        <div className={cn('flex flex-col gap-2')}>
          <label className={cn('font-title-16')}>컨셉</label>
          <div className={cn('flex flex-wrap gap-2')}>
            {conceptTags.map((tag) => (
              <ConceptTag
                key={tag.id}
                id={tag.id}
                label={tag.label}
                isSelected={selectedTags.includes(tag.id)}
                onToggle={handleTagToggle}
              />
            ))}
          </div>
        </div>
        <ApplyGuide />
        <input type="file" />

        <div className={cn('flex flex-col gap-2')}>
          <label className={cn('font-title-16')}>프로젝트 설명</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={cn('resize-none border border-gray-60 p-2 text-base')}
            placeholder="ex) 자연광 스튜디오에서 함께 촬영하실 모델분을 찾습니다!"
            rows={5}
          />
        </div>

        <div className={cn('flex flex-col gap-2')}>
          <label className={cn('font-title-16')}>보정 내용</label>
          <Textarea
            value={retouchingDetails}
            onChange={(e) => setRetouchingDetails(e.target.value)}
            className={cn('resize-none border border-gray-60 p-2 text-base')}
            placeholder="추가 수정 가능한 보정 횟수, 보정 스타일, 보정 툴 등을 적어주세요"
            rows={2}
          />
        </div>
      </div>

      <BottomButton
        onClick={handleNext}
        variant={'primary'}
        size={'large'}
        label={'다음'}
        disabled={!isNextEnabled}
      />
    </div>
  );
};

const ApplyGuide = () => {
  const guides = [
    '컨셉과 관련된 사진을 업로드해주세요.',
    '타인의 초상권, 지식 재산권 등을 침해하는 사진은 게시하지 마세요.',
  ];
  return (
    <div
      className={cn(
        'flex flex-col items-start gap-[5px] self-stretch rounded-[8px] bg-gray-90 p-[10px_12px]',
      )}
    >
      <div className="font-body-14 text-gray-40">지원 안내</div>
      <div>
        {guides.map((guide) => (
          <div key={guide} className="flex items-start gap-2">
            <span className="mt-[7px] h-[3px] w-[3px] rounded-full bg-gray-40" />
            <div className="font-caption-12 text-gray-40">{guide}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepTwo;
