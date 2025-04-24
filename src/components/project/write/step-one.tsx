'use client';

import BottomButton from '@/components/common/bottom-button';
import Icon from '@/components/common/icon';
import IconButton from '@/components/common/icon-button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import useDisclosure from '@/hooks/useDisclosure';
import { cn } from '@/lib/utils';
import { useProjectRegisterStore } from '@/store/project-regist-store';
import '@/styles/input.css';
import { Identity } from '@/types/project.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCookie } from 'cookies-next';
import { PropsWithChildren, useEffect, useRef } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const projectSchema = z.object({
  type: z.enum(['MODEL', 'PHOTOGRAPHER']),
  projectName: z
    .string()
    .min(1, '프로젝트명을 입력해주세요')
    .max(24, '최대 24자까지 입력 가능합니다'),
  shootingDate: z.object({
    date: z.string().min(1, '촬영 날짜를 선택해주세요'),
    period: z.enum(['MORNING', 'AFTERNOON', 'TO_BE_DISCUSSED']),
  }),
  location: z.object({
    type: z.enum(['INDOOR', 'OUTDOOR']),
    spot: z.string().nullable(),
    address: z.string().min(1, '주소를 입력해주세요'),
    detail: z.string().min(1, '상세 주소를 입력해주세요'),
  }),
});

type ProjectFormData = z.infer<typeof projectSchema>;

const StepOne: React.FC = () => {
  const { projectInfo, setProjectInfo, nextStep } = useProjectRegisterStore();
  const { isOpen, onToggle, onOpenChange } = useDisclosure(false);
  const cookieIdentity = getCookie('identity') as Identity;
  const dateInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<ProjectFormData>({
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

  useEffect(() => {
    if (cookieIdentity) {
      setValue('type', cookieIdentity === 'MODEL' ? 'PHOTOGRAPHER' : 'MODEL');
    }
  }, [cookieIdentity, setValue]);

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

  const handleComplete = (location: any) => {
    setValue('location.address', location.address);
    setValue('location.spot', location.sigunguCode);
    onToggle();
  };

  const onSubmit = (data: ProjectFormData) => {
    setProjectInfo(data);
    nextStep();
  };

  const watchedType = watch('type');
  const watchedPeriod = watch('shootingDate.period');
  const watchedLocationType = watch('location.type');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('relative flex h-full flex-col justify-between')}
    >
      <div
        className={cn(
          'flex h-[calc(100%-64px)] flex-col gap-4 overflow-auto scrollbar-hide',
        )}
      >
        <div className={cn('flex flex-col gap-2')}>
          <label className={cn('font-title-16')}>구인</label>
          <div className={cn('flex gap-2')}>
            <BottomButton
              variant={watchedType === 'MODEL' ? 'secondary' : 'stroke'}
              size={'middle'}
              label={'모델'}
              className="border-gray-60"
              onClick={() => setValue('type', 'MODEL')}
              type="button"
            />
            <BottomButton
              variant={watchedType === 'PHOTOGRAPHER' ? 'secondary' : 'stroke'}
              size={'middle'}
              label={'작가'}
              className="border-gray-60"
              onClick={() => setValue('type', 'PHOTOGRAPHER')}
              type="button"
            />
          </div>
        </div>

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
                ref={dateInputRef}
                onClick={handleDateClick}
                min={new Date().toISOString().split('T')[0]}
                className="font-body-14 flex h-[40px] w-full flex-1 flex-col items-center justify-center rounded-[8px] border bg-transparent p-[10.514px] text-center text-gray-20 placeholder-gray-60 focus:ring-0"
              />
              <IconButton
                icon={
                  <Icon
                    id={'calendar-icon'}
                    size={24}
                    className="text-gray-40"
                  />
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
                variant={watchedPeriod === 'MORNING' ? 'secondary' : 'stroke'}
                size={'middle'}
                label={'오전'}
                onClick={() => setValue('shootingDate.period', 'MORNING')}
                className="border-gray-60"
                type="button"
              />
              <BottomButton
                variant={watchedPeriod === 'AFTERNOON' ? 'secondary' : 'stroke'}
                size={'middle'}
                label={'오후'}
                onClick={() => setValue('shootingDate.period', 'AFTERNOON')}
                className="border-gray-60"
                type="button"
              />
              <BottomButton
                variant={
                  watchedPeriod === 'TO_BE_DISCUSSED' ? 'secondary' : 'stroke'
                }
                size={'middle'}
                label={'시간협의'}
                onClick={() =>
                  setValue('shootingDate.period', 'TO_BE_DISCUSSED')
                }
                className="border-gray-60"
                type="button"
              />
            </div>
          </div>
        </div>

        <div className={cn('flex flex-col gap-2')}>
          <label className={cn('font-title-16')}>
            촬영장소
            <div className={cn('font-body-14 mt-[2px] text-gray-40')}>
              매칭 페이지에서는 시/군/구 까지만 공개됩니다.
            </div>
          </label>
          <div className={cn('flex flex-col gap-2')}>
            <div className={cn('flex gap-2')}>
              <BottomButton
                variant={
                  watchedLocationType === 'INDOOR' ? 'secondary' : 'stroke'
                }
                size={'middle'}
                label={'실내'}
                onClick={() => setValue('location.type', 'INDOOR')}
                className="border-gray-60"
                type="button"
              />
              <BottomButton
                variant={
                  watchedLocationType === 'OUTDOOR' ? 'secondary' : 'stroke'
                }
                size={'middle'}
                label={'야외'}
                onClick={() => setValue('location.type', 'OUTDOOR')}
                className="border-gray-60"
                type="button"
              />
            </div>
            <div className="flex gap-[6px]">
              <Input
                type="text"
                {...register('location.address')}
                onClick={onToggle}
                placeholder="주소"
              />
              <IconButton
                icon={
                  <Icon id={'search-icon'} size={24} className="text-gray-40" />
                }
                onClick={onToggle}
                type="button"
              />

              <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogContent className="flex h-full flex-col">
                  <DialogHeader className="flex h-6 w-full">
                    <DialogClose asChild className="ml-auto">
                      <Icon
                        className="h-6 w-6 text-gray-40"
                        id={'close-icon'}
                      />
                    </DialogClose>
                  </DialogHeader>
                  <DaumPostcodeEmbed
                    onComplete={handleComplete}
                    style={{ height: '100%' }}
                  />
                </DialogContent>
              </Dialog>
            </div>
            {errors.location?.address && (
              <p className="text-sm text-red-500">
                {errors.location.address.message}
              </p>
            )}

            <Input
              type="text"
              {...register('location.detail')}
              placeholder="상세 주소를 입력해 주세요."
            />
            {errors.location?.detail && (
              <p className="text-sm text-red-500">
                {errors.location.detail.message}
              </p>
            )}
          </div>
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
          label={'다음'}
          disabled={!isValid}
        />
      </div>
    </form>
  );
};

function SectionLayout({ children }: PropsWithChildren) {
  return <div className={cn('flex flex-col gap-2')}>{children}</div>;
}

export default StepOne;
