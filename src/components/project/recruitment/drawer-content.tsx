'use client';

import { PROJECT_CONCEPTS } from '@/constants/project';
import useDisclosure from '@/hooks/useDisclosure';
import { cn } from '@/lib/utils';
import { LocationType, TimeOption } from '@/types/project.type';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import BottomButton from '../../common/bottom-button';
import ConceptTag from '../../common/concept-tag';
import DatePicker from '../../common/date-picker';
import Icon from '../../common/icon';
import { Input } from '../../ui/input';

interface DrawerProps {
  onClose: () => void;
}

export const ConceptDrawerContent: FC<DrawerProps> = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();

  const toggleTag = (id: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(id)
        ? prevSelectedTags.filter((tagId) => tagId !== id)
        : [...prevSelectedTags, id],
    );
  };

  const handleSelectConcept = () => {
    const queryString = new URLSearchParams(window.location.search);
    queryString.set('concepts', selectedTags.join(','));
    router.push(`?${queryString.toString()}`);
  };

  return (
    <div>
      <div
        className={cn(
          'flex h-[275px] flex-wrap content-start items-start gap-2 self-stretch',
        )}
      >
        {PROJECT_CONCEPTS.map((tag) => (
          <ConceptTag
            key={tag.id}
            id={tag.id}
            label={tag.label}
            isSelected={selectedTags.includes(tag.id)}
            onToggle={toggleTag}
          />
        ))}
      </div>
      <BottomButton
        variant={'primary'}
        size={'large'}
        label={'필터 적용하기'}
        onClick={handleSelectConcept}
        disabled={selectedTags.length === 0}
      />
    </div>
  );
};

export const AddressDrawerContent: FC<DrawerProps> = () => {
  // TODO: 주소 필터링 기획 협의
  const { isOpen, onToggle } = useDisclosure(false);
  const [address, setAddress] = useState<string | null>(null);
  const router = useRouter();

  const handleClickSearch = () => {
    onToggle();
  };

  const handleComplete = ({ address }: any) => {
    setAddress(address);
    onToggle();
    appendQuery(address);
  };

  const appendQuery = (address: string) => {
    const queryString = new URLSearchParams(window.location.search);
    queryString.set('address', address);
    router.push(`?${queryString.toString()}`);
  };

  return (
    <div>
      {/* <Dialog open={isOpen}>
          <DialogContent className="h-full">
            <DaumPostcodeEmbed
              onComplete={handleComplete}
              style={{ height: '100%' }}
            />
          </DialogContent>
        </Dialog> */}
      <div className={cn('relative h-[345px]')} onClick={handleClickSearch}>
        <Input
          className={cn('h-[46px]')}
          placeholder="주소를 검색해주세요"
          value={address || ''}
          onChange={(e) => setAddress(e.target.value)} // Allow manual address input
        />
        <Icon
          id={'search-icon'}
          size={24}
          className={cn('absolute right-[15px] top-[11px] text-[#7E7774]')}
          onClick={() => console.log('search address')}
        />
      </div>
      <BottomButton
        variant={'primary'}
        size={'large'}
        label={'필터 적용하기'}
        onClick={handleComplete}
        disabled={true}
      />
    </div>
  );
};

export const DateDrawerContent: FC<DrawerProps> = () => {
  const [selectedTime, setSelectedTime] = useState<TimeOption | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const router = useRouter();

  const handleTimeSelection = (time: TimeOption) => {
    setSelectedTime(time);
  };

  const applyFilters = () => {
    if (selectedDate && selectedTime) {
      const queryString = new URLSearchParams(window.location.search);
      queryString.set('date', selectedDate.toISOString()); // 'date' 쿼리 키 업데이트
      queryString.set('time', selectedTime); // 'time' 쿼리 키 업데이트
      router.push(`?${queryString.toString()}`);
    }
  };

  return (
    <div>
      <div
        className={cn(
          'flex min-h-[352px] flex-col items-start gap-4 self-stretch pb-[40px]',
        )}
      >
        <div className={cn('flex flex-col items-start gap-3 self-stretch')}>
          <div
            className={cn(
              'text-[18px] font-semibold leading-[24.3px] text-[#4D4744]',
            )}
          >
            날짜
          </div>
          <div>
            <DatePicker
              onDateChange={(date: Date | null) => setSelectedDate(date)}
            />
          </div>
        </div>
        <div className={cn('flex flex-col items-start gap-3 self-stretch')}>
          <div
            className={cn(
              'text-[18px] font-semibold leading-[24.3px] text-[#4D4744]',
            )}
          >
            시간
          </div>
          <div className={cn('flex items-start gap-2 self-stretch')}>
            <BottomButton
              variant={selectedTime === 'MORNING' ? 'secondary' : 'stroke'}
              size={'middle'}
              label={'오전'}
              onClick={() => handleTimeSelection('MORNING')}
            />
            <BottomButton
              variant={selectedTime === 'AFTERNOON' ? 'secondary' : 'stroke'}
              size={'middle'}
              label={'오후'}
              onClick={() => handleTimeSelection('AFTERNOON')}
            />
            <BottomButton
              variant={
                selectedTime === 'TO_BE_DISCUSSED' ? 'secondary' : 'stroke'
              }
              size={'middle'}
              label={'시간협의'}
              onClick={() => handleTimeSelection('TO_BE_DISCUSSED')}
            />
          </div>
        </div>
        <BottomButton
          variant={'primary'}
          size={'large'}
          label={'필터 적용하기'}
          onClick={applyFilters}
          disabled={!(selectedDate && selectedTime)}
        />
      </div>
    </div>
  );
};

export const LocationDrawerContent: FC<DrawerProps> = () => {
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(
    null,
  );
  const router = useRouter();

  const handleSelectLocation = (location: LocationType) => {
    setSelectedLocation(location);

    // 쿼리 문자열 업데이트
    const queryString = new URLSearchParams(window.location.search);
    queryString.set('location', location); // 'location' 쿼리 키 업데이트
    router.push(`?${queryString.toString()}`);
  };

  return (
    <div>
      <div className="flex h-[290px] flex-col items-start gap-2 self-stretch">
        <BottomButton
          variant={selectedLocation === 'OUTDOOR' ? 'secondary' : 'stroke'}
          size={'large'}
          label={'야외'}
          onClick={() => handleSelectLocation('OUTDOOR')}
        />
        <BottomButton
          variant={selectedLocation === 'INDOOR' ? 'secondary' : 'stroke'}
          size={'large'}
          label={'스튜디오'}
          onClick={() => handleSelectLocation('INDOOR')}
        />
      </div>
    </div>
  );
};
