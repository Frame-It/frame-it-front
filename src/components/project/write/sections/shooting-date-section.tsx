import BottomButton from '@/components/common/bottom-button';
import Icon from '@/components/common/icon';
import IconButton from '@/components/common/icon-button';
import { Input } from '@/components/ui/input';
import { ProjectFormData } from '@/lib/schemas/project-schema';
import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { useFormContext } from 'react-hook-form';

const ShootingDateSection = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ProjectFormData>();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const period = watch('shootingDate.period');
  const date = watch('shootingDate.date');

  const handleDateClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
      dateInputRef.current.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        setValue('shootingDate.date', target.value);
      });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('shootingDate.date', e.target.value);
  };

  return (
    <div className={cn('flex flex-col gap-2')}>
      <label className={cn('font-title-16')}>
        촬영일시
        <div className={cn('font-body-14 mt-[2px] text-gray-40')}>
          촬영날짜와 시각을 입력해주세요.
        </div>
      </label>
      <div className={cn('flex flex-col gap-2')}>
        <div className="flex gap-[6px]">
          <Input
            type="date"
            {...register('shootingDate.date')}
            onChange={handleDateChange}
            placeholder="YYYY/MM/DD"
            value={date}
            ref={dateInputRef}
            onClick={handleDateClick}
            min={new Date().toISOString().split('T')[0]}
            className="font-body-14 flex h-[40px] w-full flex-1 flex-col items-center justify-center rounded-[8px] border bg-transparent p-[10.514px] text-center text-gray-20 placeholder-gray-60 focus:ring-0"
          />
          <IconButton
            icon={
              <Icon id={'calendar-icon'} size={24} className="text-gray-40" />
            }
            onClick={handleDateClick}
            type="button"
          />
        </div>
        {errors.shootingDate?.date && (
          <p className="text-sm text-red-500">
            {errors.shootingDate.date.message}
          </p>
        )}
        <div className={cn('flex gap-2')}>
          <BottomButton
            variant={period === 'MORNING' ? 'secondary' : 'stroke'}
            size={'middle'}
            label={'오전'}
            onClick={() => setValue('shootingDate.period', 'MORNING')}
            className="border-gray-60"
            type="button"
          />
          <BottomButton
            variant={period === 'AFTERNOON' ? 'secondary' : 'stroke'}
            size={'middle'}
            label={'오후'}
            onClick={() => setValue('shootingDate.period', 'AFTERNOON')}
            className="border-gray-60"
            type="button"
          />
          <BottomButton
            variant={period === 'TO_BE_DISCUSSED' ? 'secondary' : 'stroke'}
            size={'middle'}
            label={'시간협의'}
            onClick={() => setValue('shootingDate.period', 'TO_BE_DISCUSSED')}
            className="border-gray-60"
            type="button"
          />
        </div>
      </div>
    </div>
  );
};

export default ShootingDateSection;
