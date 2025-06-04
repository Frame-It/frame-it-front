'use client';

import BottomButton from '@/components/common/bottom-button';
import { ProjectFormData } from '@/lib/schemas/project-schema';
import { cn } from '@/lib/utils';
import { Identity } from '@/types/project.type';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const ProjectTypeSection = () => {
  const { watch, setValue } = useFormContext<ProjectFormData>();
  const type = watch('type');
  const cookieIdentity = getCookie('identity') as Identity;

  useEffect(() => {
    if (cookieIdentity) {
      const newType = cookieIdentity === 'MODEL' ? 'PHOTOGRAPHER' : 'MODEL';
      setValue('type', newType, { shouldValidate: true });
    }
  }, [cookieIdentity, setValue]);

  const handleTypeChange = (newType: 'MODEL' | 'PHOTOGRAPHER') => {
    setValue('type', newType, { shouldValidate: true });
  };

  return (
    <div className={cn('flex flex-col gap-2')}>
      <label className={cn('font-title-16')}>구인</label>
      <div className={cn('flex gap-2')}>
        <BottomButton
          variant={type === 'MODEL' ? 'secondary' : 'stroke'}
          size={'middle'}
          label={'모델'}
          className="border-gray-60"
          onClick={() => handleTypeChange('MODEL')}
          type="button"
        />
        <BottomButton
          variant={type === 'PHOTOGRAPHER' ? 'secondary' : 'stroke'}
          size={'middle'}
          label={'작가'}
          className="border-gray-60"
          onClick={() => handleTypeChange('PHOTOGRAPHER')}
          type="button"
        />
      </div>
    </div>
  );
};

export default ProjectTypeSection;
