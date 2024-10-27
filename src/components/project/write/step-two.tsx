'use client';

import BottomButton from '@/components/common/bottom-button';
import ConceptTag from '@/components/common/concept-tag';
import Guide from '@/components/common/guide';
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
import { PROJECT_CONCEPTS } from '@/constants/project';
import { useRecruitmentEditMutation } from '@/hooks/queries/projects/useRecruitmentEditMutation';
import { useRecruitmentMutation } from '@/hooks/queries/projects/useRecruitmentMutation';
import {
  ProjectImageFormValues,
  projectImageSchema,
} from '@/lib/schema/project-regist-schema';
import { cn } from '@/lib/utils';
import { useProjectRegisterStore } from '@/store/project-regist-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

const StepTwo = ({
  isEdit = false,
  projectId,
}: {
  isEdit?: boolean;
  projectId?: number;
}) => {
  const { mutateAsync } = useRecruitmentMutation();
  const { mutate: editMutate } = useRecruitmentEditMutation();
  const { projectInfo, reset } = useProjectRegisterStore();
  const [selectedTags, setSelectedTags] = useState<string[]>(
    projectInfo.conceptTags,
  );

  const router = useRouter();

  const [description, setDescription] = useState<string>(
    projectInfo.description,
  );
  const [retouchingDetails, setRetouchingDetails] = useState(
    projectInfo.retouchingDetails,
  );
  const handleTagToggle = (id: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(id)
        ? prevSelectedTags.filter((tagId) => tagId !== id)
        : [...prevSelectedTags, id],
    );
  };

  const isNextEnabled = Boolean(
    selectedTags.length &&
      description &&
      retouchingDetails &&
      (projectInfo.photos?.length || projectInfo.photoUrls?.length),
  );

  const handleNext = async () => {
    const formData = new FormData();
    formData.append('title', projectInfo.projectName);
    formData.append('recruitmentRole', projectInfo.type || 'MODEL');
    formData.append(
      'shootingAt',
      // `${projectInfo.shootingDate.date}T${projectInfo.shootingDate.time}:00`,
      `${projectInfo.shootingDate.date}T00:00:00`,
    );
    formData.append('timeOption', projectInfo.shootingDate.period ?? '');
    formData.append('locationType', projectInfo.location.type ?? '');
    formData.append('spot', projectInfo.location.address);
    // TODO: 상세 주소 필요
    formData.append('description', description);
    formData.append('retouchingDescription', retouchingDetails);

    selectedTags.forEach((tag) => {
      formData.append('concepts', tag);
    });

    projectInfo.photos?.forEach((file) => {
      formData.append('conceptPhotos', file, file.name);
    });

    try {
      if (isEdit && projectId !== undefined) {
        editMutate({ formData, projectId });
        router.replace(
          `/project-management/${projectId}?status=RECRUITING&isHost=true`,
        );
      } else {
        const projectId = await mutateAsync(formData);
        router.replace(
          `?complete=true&title=${projectInfo.projectName}&id=${projectId}`,
        );
      }
      reset();
    } catch (error) {
      console.error(error);
      toast({
        title: '프로젝트 등록에 실패했습니다.',
      });
    }
  };

  return (
    <div className={cn('relative flex h-full flex-col justify-between')}>
      <div
        className={cn(
          'flex h-[calc(100%-64px)] flex-col gap-4 overflow-auto scrollbar-hide',
        )}
      >
        <div className={cn('flex flex-col gap-2')}>
          <label className={cn('font-title-16')}>컨셉</label>
          <div className={cn('flex flex-wrap gap-2')}>
            {PROJECT_CONCEPTS.map((tag) => (
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
            maxLength={300}
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
            maxLength={60}
          />
        </div>
      </div>

      <div
        className={cn(
          'absolute bottom-0 left-0 flex h-[64px] w-full items-center',
        )}
      >
        <BottomButton
          onClick={handleNext}
          variant={'primary'}
          size={'large'}
          label={isEdit ? '수정하기' : '다음'}
          disabled={!isNextEnabled}
        />
      </div>
    </div>
  );
};

const ApplyGuide = () => {
  const guides = [
    '컨셉과 관련된 사진을 업로드해주세요.',
    '타인의 초상권, 지식 재산권 등을 침해하는 사진은 게시하지 마세요.',
  ];
  return <Guide guides={guides} title="지원 안내" />;
};

const Images = () => {
  const { setProjectInfo, projectInfo } = useProjectRegisterStore();

  const form = useForm<ProjectImageFormValues>({
    resolver: zodResolver(projectImageSchema),
  });

  const [previews, setPreviews] = useState<string[]>(
    projectInfo.photoUrls ?? [],
  );
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
    const updatedPreviews = [...previews, ...displayUrls];
    const updatedFiles = [...files, ...newFilesArray];

    setPreviews(updatedPreviews);
    setFiles(updatedFiles);
    form.setValue('images', updatedFiles);

    setProjectInfo({
      ...projectInfo, // 기존 projectInfo 복사
      photos: updatedFiles, // photos 필드 업데이트
    });
  };

  // const handleRemoveImage = (index: number) => {
  //   setPreviews((prev) => prev.filter((_, i) => i !== index));
  //   const updatedFiles = files.filter((_, i) => i !== index);
  //   setFiles(updatedFiles);
  //   form.setValue('images', updatedFiles);
  // };

  return (
    <section className="flex h-fit flex-shrink-0 items-center gap-2 overflow-x-auto scrollbar-hide">
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
        </form>
      </Form>
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
            {/* <button
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
            </button> */}
          </div>
        ))}
      </div>
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
