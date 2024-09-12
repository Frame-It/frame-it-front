'use client';

import BottomButton from '@/components/common/bottom-button';
import ConceptTag from '@/components/common/concept-tag';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import {
  ProjectImageFormValues,
  projectImageSchema,
} from '@/lib/schema/project-regist-schema';
import { cn } from '@/lib/utils';
import { useProjectRegisterStore } from '@/store/project-regist-store';
import { faker } from '@faker-js/faker/locale/ko';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

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
    <div className={cn('flex h-full flex-1 flex-col justify-between pb-4')}>
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
        <Images />
        <div className={cn('flex flex-col gap-2')}>
          <label className={cn('font-title-16')}>프로젝트 설명</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={cn('resize-none border border-gray-60 p-2')}
            placeholder="ex) 자연광 스튜디오에서 함께 촬영하실 모델분을 찾습니다!"
            rows={5}
          />
        </div>

        <div className={cn('flex flex-col gap-2')}>
          <label className={cn('font-title-16')}>보정 내용</label>
          <Textarea
            value={retouchingDetails}
            onChange={(e) => setRetouchingDetails(e.target.value)}
            className={cn('resize-none border border-gray-60 p-2')}
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
        className={cn('mt-5')}
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

const Images = () => {
  const form = useForm<ProjectImageFormValues>({
    resolver: zodResolver(projectImageSchema),
  });

  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles, displayUrls } = getImageData(e);

    if (previews.length + displayUrls.length > 10) {
      toast({
        title: '사진은 최대 10장까지 등록 가능해요!',
      });
      return;
    }

    const newFilesArray = Array.from(newFiles) as File[];
    setPreviews((prev) => [...prev, ...displayUrls]);
    setFiles((prev) => [...prev, ...newFilesArray]);
    form.setValue('images', [...files, ...newFilesArray]);
  };

  const handleRemoveImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    form.setValue('images', updatedFiles);
  };

  return (
    <section className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
      {/* 미리보기 섹션 */}
      <div className="flex items-center gap-2">
        {previews.map((preview, index) => (
          <div key={index} className="relative flex h-[87px] w-[95px] gap-2">
            <img
              alt={`preview-${index}`}
              src={preview}
              width={95}
              height={87}
              className="rounded-[8px] object-cover"
            />
            <button
              type="button"
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 opacity-70"
              onClick={() => handleRemoveImage(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
              >
                <path
                  d="M4.00636 4.92808L1.13035 7.80232C1.00203 7.93071 0.846476 7.99343 0.663675 7.99048C0.480727 7.98768 0.325095 7.92215 0.19678 7.79391C0.0684654 7.66566 0.00430786 7.50871 0.00430786 7.32306C0.00430786 7.1374 0.0684654 6.98046 0.19678 6.85221L3.06416 3.98639L0.188364 1.13407C0.0599011 1.00582 -0.00285362 0.848871 9.95449e-05 0.663217C0.00290505 0.477712 0.0684654 0.320836 0.19678 0.19259C0.325095 0.0641968 0.48213 0 0.667884 0C0.853638 0 1.01067 0.0641968 1.13899 0.19259L4.00636 3.06683L6.86023 0.19259C6.98854 0.0641968 7.1441 0 7.3269 0C7.50985 0 7.66548 0.0641968 7.7938 0.19259C7.93126 0.329838 8 0.489001 8 0.67008C8 0.851158 7.93126 1.00582 7.7938 1.13407L4.92642 3.98639L7.80221 6.86084C7.93068 6.98909 7.99491 7.14456 7.99491 7.32726C7.99491 7.51011 7.93068 7.66566 7.80221 7.79391C7.66489 7.9313 7.50564 8 7.32446 8C7.14329 8 6.98854 7.9313 6.86023 7.79391L4.00636 4.92808Z"
                  fill="#201A17"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => console.log(form.getValues()))}
          // className="mt-[16px]"
        >
          {files.length >= 10 ? null : (
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormControl>
                    <>
                      <FormLabel
                        htmlFor="images"
                        className="relative flex h-[87px] w-[95px] cursor-pointer flex-col items-center justify-center rounded-[8px] border border-gray-60"
                      >
                        <PlusIcon size={32} className="text-gray-40" />
                        <Input
                          id="images"
                          accept="image/*"
                          type="file"
                          multiple
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </FormLabel>
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-[360px] bg-white px-[16px] py-[9px]">
            <Button
              type="submit"
              disabled={previews.length <= 0}
              className="w-full"
            >
              다음
            </Button>
          </div> */}
        </form>
      </Form>
    </section>
  );
};
function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image),
  );

  const files = dataTransfer.files;
  const displayUrls = Array.from(event.target.files!).map((file) =>
    URL.createObjectURL(file),
  );

  return { files, displayUrls };
}

export default StepTwo;
