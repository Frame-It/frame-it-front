'use client';

import BottomButton from '@/components/common/bottom-button';
import LoadingSpinner from '@/components/common/loading-spinner';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { ProjectFormData, projectSchema } from '@/lib/schemas/project-schema';
import { cn } from '@/lib/utils';
import {
  useRecruitmentEditMutation,
  useRecruitmentMutation,
} from '@/service/project-recruitment/use-service';
import { useProjectRegisterStore } from '@/store/project-regist-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import ApplyGuide from './sections/apply-guide';
import ConceptSection from './sections/concept-section';
import ImageUploadSection from './sections/image-upload-section';
import ProjectDescriptionSection from './sections/project-description-section';
import RetouchingSection from './sections/retouching-section';

const stepTwoSchema = projectSchema.pick({
  conceptTags: true,
  description: true,
  retouchingDetails: true,
  photos: true,
});

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

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      conceptTags: projectInfo.conceptTags,
      description: projectInfo.description,
      retouchingDetails: projectInfo.retouchingDetails,
      photos: projectInfo.photos || [],
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: ProjectFormData) => {
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
          <ConceptSection />
          <ApplyGuide />
          <ImageUploadSection />
          <ProjectDescriptionSection />
          <RetouchingSection />
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

export default StepTwo;
