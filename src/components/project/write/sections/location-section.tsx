import BottomButton from '@/components/common/bottom-button';
import Icon from '@/components/common/icon';
import IconButton from '@/components/common/icon-button';
import { Input } from '@/components/ui/input';
import useDisclosure from '@/hooks/useDisclosure';
import { ProjectFormData } from '@/lib/schemas/project-schema';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import AddressSearchDialog from './address-search-dialog';

const LocationSection = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<ProjectFormData>();
  const { isOpen, onToggle, onOpenChange } = useDisclosure(false);
  const locationType = watch('location.type');

  const handleComplete = (location: any) => {
    setValue('location.address', location.address);
    setValue('location.spot', location.sigunguCode);
    onToggle();
  };

  return (
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
            variant={locationType === 'INDOOR' ? 'secondary' : 'stroke'}
            size={'middle'}
            label={'실내'}
            onClick={() => setValue('location.type', 'INDOOR')}
            className="border-gray-60"
            type="button"
          />
          <BottomButton
            variant={locationType === 'OUTDOOR' ? 'secondary' : 'stroke'}
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

          <AddressSearchDialog
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onComplete={handleComplete}
          />
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
  );
};

export default LocationSection;
