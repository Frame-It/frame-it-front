import { Input } from '@/components/ui/input';
import { ProjectFormData } from '@/lib/schemas/project-schema';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

const ProjectNameSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProjectFormData>();

  return (
    <div className={cn('flex flex-col gap-2')}>
      <label className={cn('font-title-16')}>
        프로젝트명
        <div className={cn('font-body-14 mt-[2px] text-gray-60')}>
          최대 24자까지 가능합니다.
        </div>
      </label>
      <Input
        {...register('projectName')}
        maxLength={24}
        placeholder="ex) 함께 촬영하실 모델분 구해요!"
      />
      {errors.projectName && (
        <p className="text-sm text-red-500">{errors.projectName.message}</p>
      )}
    </div>
  );
};

export default ProjectNameSection;
