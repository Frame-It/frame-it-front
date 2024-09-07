import { cn } from '@/lib/utils';
import { faker } from '@faker-js/faker/locale/ko';
import { FC, PropsWithChildren, useState } from 'react';
import BottomButton from '../common/bottom-button';
import ConceptTag from '../common/concept-tag';

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
export const DateDrawerContent = () => (
  <DrawerContentLayout></DrawerContentLayout>
);

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
