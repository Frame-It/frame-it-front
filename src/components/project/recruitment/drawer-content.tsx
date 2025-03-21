'use client';

import HighlightedText from '@/components/common/highlighted-text';
import { PROJECT_CONCEPTS } from '@/constants/project';
import { cn } from '@/lib/utils';

import { getSigunguList } from '@/service/project-recruitment/service';
import { LocationType, TimeOption } from '@/types/project.type';
import { useRouter } from 'next/navigation';
import { FC, FormEvent, useState } from 'react';
import BottomButton from '../../common/bottom-button';
import ConceptTag from '../../common/concept-tag';
import DatePicker from '../../common/date-picker';
import Icon from '../../common/icon';
import { Input } from '../../ui/input';

interface DrawerProps {
  onClose: () => void;
}

export const ConceptDrawerContent: FC<DrawerProps> = ({ onClose }) => {
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
    queryString.set('concepts', selectedTags.join('+'));
    router.replace(`?${queryString.toString()}`);
    onClose();
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

export const AddressDrawerContent: FC<DrawerProps> = ({ onClose }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [sigunguCode, setSigunguCode] = useState<string | null>(null);
  const [sigunguFeatures, setSigunguFeatures] = useState([]);
  const router = useRouter();

  const handleClickSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!address) return;
    const data = await getSigunguList(address);

    setSigunguFeatures(data.features);
  };

  const handleSelect = (selectedSigungu: string, selectedAddress: string) => {
    setSigunguCode(selectedSigungu);
    setAddress(selectedAddress);
  };

  const handleComplete = () => {
    if (!sigunguCode) return;
    appendQuery(sigunguCode);
    onClose();
  };

  const appendQuery = (spot: string) => {
    const queryString = new URLSearchParams(window.location.search);
    queryString.set('spot', spot);
    router.replace(`?${queryString.toString()}`);
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="relative flex h-[345px] flex-col gap-4">
        <form className={cn('h-[46px]')} onSubmit={handleClickSearch}>
          <Input
            className={cn('h-[46px]')}
            placeholder="주소를 검색해주세요"
            value={address || ''}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button>
            <Icon
              id={'search-icon'}
              size={24}
              className={cn('absolute right-[15px] top-[11px] text-[#7E7774]')}
            />
          </button>
        </form>

        <div className="flex flex-col gap-[10px] overflow-y-auto px-2 pb-2">
          {sigunguFeatures.map((feature: any) => {
            return (
              <div
                key={feature.properties.sig_cd}
                onClick={() =>
                  handleSelect(
                    feature.properties.sig_cd,
                    feature.properties.sig_kor_nm,
                  )
                }
                className="font-body-14 text-gray-60"
              >
                <HighlightedText
                  word={feature.properties.sig_kor_nm}
                  keyword={address ?? ''}
                />
              </div>
            );
          })}
        </div>
      </div>

      <BottomButton
        variant={'primary'}
        size={'large'}
        label={'필터 적용하기'}
        onClick={handleComplete}
        disabled={!sigunguCode}
      />
    </div>
  );
};

export const DateDrawerContent: FC<DrawerProps> = ({ onClose }) => {
  const [selectedTime, setSelectedTime] = useState<TimeOption | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const router = useRouter();

  const handleTimeSelection = (time: TimeOption) => {
    setSelectedTime(time);
  };

  const applyFilters = () => {
    if (startDate && endDate && selectedTime) {
      const queryString = new URLSearchParams(window.location.search);
      queryString.set('startDate', startDate.toISOString()); // 'date' 쿼리 키 업데이트
      queryString.set('endDate', endDate.toISOString()); // 'date' 쿼리 키 업데이트
      queryString.set('timeOption', selectedTime); // 'time' 쿼리 키 업데이트
      router.replace(`?${queryString.toString()}`);
      onClose();
    }
  };

  return (
    <div className="flex h-full flex-col justify-between">
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
              onDateChange={(startDate: Date | null, endDate: Date | null) => {
                setStartDate(startDate);
                setEndDate(endDate);
              }}
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
      </div>
      <BottomButton
        variant={'primary'}
        size={'large'}
        label={'필터 적용하기'}
        onClick={applyFilters}
        disabled={!(startDate && endDate && selectedTime)}
      />
    </div>
  );
};

export const LocationDrawerContent: FC<DrawerProps> = ({ onClose }) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(
    null,
  );
  const router = useRouter();

  const handleSelectLocation = () => {
    // 쿼리 문자열 업데이트
    if (!selectedLocation) return;
    const queryString = new URLSearchParams(window.location.search);
    queryString.set('locationType', selectedLocation);
    router.replace(`?${queryString.toString()}`);
    onClose();
  };

  return (
    <div>
      <div className="flex h-[290px] flex-col items-start gap-2 self-stretch">
        <BottomButton
          variant={selectedLocation === 'OUTDOOR' ? 'secondary' : 'stroke'}
          size={'large'}
          label={'야외'}
          onClick={() => setSelectedLocation('OUTDOOR')}
        />
        <BottomButton
          variant={selectedLocation === 'INDOOR' ? 'secondary' : 'stroke'}
          size={'large'}
          label={'스튜디오'}
          onClick={() => setSelectedLocation('INDOOR')}
        />
      </div>

      <BottomButton
        variant={'primary'}
        size={'large'}
        label={'필터 적용하기'}
        onClick={handleSelectLocation}
        disabled={!selectedLocation}
      />
    </div>
  );
};
