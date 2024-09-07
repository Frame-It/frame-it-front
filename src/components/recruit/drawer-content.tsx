import { cn } from '@/lib/utils';
import { faker } from '@faker-js/faker/locale/ko';
import { FC, PropsWithChildren, useState } from 'react';
import BottomButton from '../common/bottom-button';
import ConceptTag from '../common/concept-tag';
import DatePicker from '../common/date-picker';

const DrawerContentLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      {children}
      <BottomButton
        variant={'primary'}
        size={'large'}
        label={'필터 적용하기'}
      />
    </div>
  );
};
const generateTags = () => {
  return Array.from({ length: 10 }, (_, index) => ({
    id: index,
    label: faker.lorem.word(),
  }));
};

interface ITag {
  id: number;
  label: string;
}

export const ConceptDrawerContent = () => {
  const [tags] = useState<ITag[]>(generateTags);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const toggleTag = (id: number) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(id)
        ? prevSelectedTags.filter((tagId) => tagId !== id)
        : [...prevSelectedTags, id],
    );
  };

  return (
    <DrawerContentLayout>
      <div
        className={cn(
          'flex h-[275px] flex-wrap content-start items-start gap-2 self-stretch',
        )}
      >
        {tags.map((tag) => (
          <ConceptTag
            key={tag.id}
            id={tag.id}
            label={tag.label}
            isSelected={selectedTags.includes(tag.id)}
            onToggle={toggleTag}
          />
        ))}
      </div>
    </DrawerContentLayout>
  );
};

export const LocationDrawerContent = () => (
  <DrawerContentLayout></DrawerContentLayout>
);

export const DateDrawerContent = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <DrawerContentLayout>
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
            <DatePicker />
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
              variant={selectedTime === '오전' ? 'secondary' : 'stroke'}
              size={'middle'}
              label={'오전'}
              onClick={() => handleTimeSelection('오전')}
            />
            <BottomButton
              variant={selectedTime === '오후' ? 'secondary' : 'stroke'}
              size={'middle'}
              label={'오후'}
              onClick={() => handleTimeSelection('오후')}
            />
            <BottomButton
              variant={selectedTime === '시간협의' ? 'secondary' : 'stroke'}
              size={'middle'}
              label={'시간협의'}
              onClick={() => handleTimeSelection('시간협의')}
            />
          </div>
        </div>
      </div>
    </DrawerContentLayout>
  );
};

export const PlaceDrawerContent = () => {
  const [selectedPlace, setSelectedPlace] = useState<
    'outdoor' | 'studio' | null
  >(null);

  const handleSelectPlace = (place: 'outdoor' | 'studio') => {
    setSelectedPlace(place);
  };

  return (
    <DrawerContentLayout>
      <div
        className={cn('flex h-[290px] flex-col items-start gap-2 self-stretch')}
      >
        <BottomButton
          variant={selectedPlace === 'outdoor' ? 'secondary' : 'stroke'}
          size={'large'}
          label={'야외'}
          onClick={() => handleSelectPlace('outdoor')}
        />
        <BottomButton
          variant={selectedPlace === 'studio' ? 'secondary' : 'stroke'}
          size={'large'}
          label={'스튜디오'}
          onClick={() => handleSelectPlace('studio')}
        />
      </div>
    </DrawerContentLayout>
  );
};
