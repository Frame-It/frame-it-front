'use client';

import BottomButton from '@/components/common/bottom-button';
import ConceptTag from '@/components/common/concept-tag';
import Guide from '@/components/common/guide';
import LoadingSpinner from '@/components/common/loading-spinner';
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
import { cn } from '@/lib/utils';
import {
  useRecruitmentEditMutation,
  useRecruitmentMutation,
} from '@/service/project-recruitment/use-service';
import { useProjectRegisterStore } from '@/store/project-regist-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const projectStepTwoSchema = z.object({
  conceptTags: z
    .array(z.string())
    .min(1, '최소 1개 이상의 컨셉을 선택해주세요')
    .max(3, '최대 3개까지 선택 가능합니다')
    .refine((tags) => tags.length <= 3, '최대 3개까지 선택 가능합니다'),
  description: z
    .string()
    .min(1, '프로젝트 설명을 입력해주세요')
    .max(300, '최대 300자까지 입력 가능합니다'),
  retouchingDetails: z
    .string()
    .min(1, '보정 내용을 입력해주세요')
    .max(60, '최대 60자까지 입력 가능합니다'),
  photos: z
    .array(z.instanceof(File))
    .min(1, '최소 1개 이상의 사진을 업로드해주세요'),
});

type ProjectStepTwoFormValues = z.infer<typeof projectStepTwoSchema>;

const StepTwo = ({
  isEdit = false,
  projectId,
}: {
  isEdit?: boolean;
  projectId?: number;
}) => {
  const { mutateAsync, isPending: isRegistPending } = useRecruitmentMutation();
  const { mutateAsync: editMutate, isPending: isEditPending } =
    useRecruitmentEditMutation();
  const { projectInfo, reset } = useProjectRegisterStore();
  const router = useRouter();

  const isPending = isEditPending || isRegistPending;

  const form = useForm<ProjectStepTwoFormValues>({
    resolver: zodResolver(projectStepTwoSchema),
    defaultValues: {
      conceptTags: projectInfo.conceptTags,
      description: projectInfo.description,
      retouchingDetails: projectInfo.retouchingDetails,
      photos: projectInfo.photos || [],
    },
  });

  const onSubmit = async (data: ProjectStepTwoFormValues) => {
    const formData = new FormData();
    formData.append('title', projectInfo.projectName);
    formData.append('recruitmentRole', projectInfo.type || 'MODEL');
    formData.append('shootingAt', `${projectInfo.shootingDate.date}T00:00:00`);
    formData.append('timeOption', projectInfo.shootingDate.period ?? '');
    formData.append('locationType', projectInfo.location.type ?? '');
    formData.append('spot', projectInfo.location.spot ?? '');
    formData.append('address', projectInfo.location.address);
    formData.append('detailedAddress', projectInfo.location.detail);
    formData.append('description', data.description);
    formData.append('retouchingDescription', data.retouchingDetails);

    data.conceptTags.forEach((tag) => {
      formData.append('concepts', tag);
    });

    data.photos.forEach((file) => {
      formData.append('conceptPhotos', file, file.name);
    });

    try {
      if (isEdit && projectId !== undefined) {
        await editMutate({ formData, projectId });
        router.replace(`/project-management`);
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('relative flex h-full flex-col justify-between')}
      >
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
                  isSelected={form.watch('conceptTags').includes(tag.id)}
                  onToggle={() => {
                    const currentTags = form.getValues('conceptTags');
                    const newTags = currentTags.includes(tag.id)
                      ? currentTags.filter((id) => id !== tag.id)
                      : [...currentTags, tag.id];

                    try {
                      // Zod 스키마로 유효성 검사
                      projectStepTwoSchema.shape.conceptTags.parse(newTags);
                      form.setValue('conceptTags', newTags);
                    } catch (error) {
                      if (error instanceof z.ZodError) {
                        toast({
                          title: error.errors[0].message,
                        });
                      }
                    }
                  }}
                />
              ))}
            </div>
            {form.formState.errors.conceptTags && (
              <p className="text-sm text-red-500">
                {form.formState.errors.conceptTags.message}
              </p>
            )}
          </div>
          <ApplyGuide />
          <Images form={form} />
          <div className={cn('flex flex-col gap-2')}>
            <label className={cn('font-title-16')}>프로젝트 설명</label>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      className={cn('resize-none border border-gray-60 p-2')}
                      placeholder="ex) 자연광 스튜디오에서 함께 촬영하실 모델분을 찾습니다!"
                      rows={5}
                      maxLength={300}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className={cn('flex flex-col gap-2')}>
            <label className={cn('font-title-16')}>보정 내용</label>
            <FormField
              control={form.control}
              name="retouchingDetails"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      className={cn('resize-none border border-gray-60 p-2')}
                      placeholder="추가 수정 가능한 보정 횟수, 보정 스타일, 보정 툴 등을 적어주세요"
                      rows={2}
                      maxLength={60}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div
          className={cn(
            'absolute bottom-0 left-0 flex h-[64px] w-full items-center',
          )}
        >
          <BottomButton
            type="submit"
            variant={'primary'}
            size={'large'}
            disabled={!form.formState.isValid || isPending}
          >
            {isPending ? <LoadingSpinner /> : isEdit ? '수정하기' : '다음'}
          </BottomButton>
        </div>
      </form>
    </Form>
  );
};

const ApplyGuide = () => {
  const guides = [
    '컨셉과 관련된 사진을 업로드해주세요.',
    '타인의 초상권, 지식 재산권 등을 침해하는 사진은 게시하지 마세요.',
  ];
  return <Guide guides={guides} title="지원 안내" />;
};

const Images = ({ form }: { form: any }) => {
  const { setProjectInfo, projectInfo } = useProjectRegisterStore();
  const [previews, setPreviews] = useState<string[]>(
    projectInfo.photoUrls ?? [],
  );

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
    const updatedFiles = [...form.getValues('photos'), ...newFilesArray];

    setPreviews(updatedPreviews);
    form.setValue('photos', updatedFiles);

    setProjectInfo({
      ...projectInfo,
      photos: updatedFiles,
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
      <form onSubmit={form.handleSubmit(() => console.log(form.getValues()))}>
        {form.watch('photos')?.length >= 10 ? null : (
          <FormField
            control={form.control}
            name="photos"
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
