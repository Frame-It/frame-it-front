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

  const handleNext = () => {
    if (selectedTags.length && description) {
      setProjectInfo({
        ...projectInfo,
        conceptTags: selectedTags.map((v, i) => conceptTags[i].label),
        description,
      });
      nextStep();
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
      />
    </div>
  );
};

export default StepTwo;
