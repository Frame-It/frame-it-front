'use client';

import BottomButton from '@/components/common/bottom-button';
import { ProjectFormData, projectSchema } from '@/lib/schemas/project-schema';
import { cn } from '@/lib/utils';
import { useProjectRegisterStore } from '@/store/project-regist-store';
import '@/styles/input.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import LocationSection from './sections/location-section';
import ProjectNameSection from './sections/project-name-section';
import ProjectTypeSection from './sections/project-type-section';
import ShootingDateSection from './sections/shooting-date-section';

const StepOne: React.FC = () => {
  const { projectInfo, setProjectInfo, nextStep } = useProjectRegisterStore();

  const methods = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    mode: 'onChange',
    defaultValues: {
      type: projectInfo.type || undefined,
      projectName: projectInfo.projectName,
      shootingDate: {
        date: projectInfo.shootingDate.date,
        period: projectInfo.shootingDate.period || undefined,
      },
      location: {
        type: projectInfo.location.type || undefined,
        spot: projectInfo.location.spot,
        address: projectInfo.location.address,
        detail: projectInfo.location.detail,
      },
    },
  });

  const onSubmit = (data: ProjectFormData) => {
    setProjectInfo(data);
    nextStep();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn('relative flex h-full flex-col justify-between')}
      >
        <div
          className={cn(
            'flex h-[calc(100%-64px)] flex-col gap-4 overflow-auto scrollbar-hide',
          )}
        >
          <ProjectTypeSection />
          <ProjectNameSection />
          <ShootingDateSection />
          <LocationSection />
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
            label={'다음'}
            disabled={!methods.formState.isValid}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default StepOne;
