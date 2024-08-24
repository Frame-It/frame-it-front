'use client';

import { generateRandomImageList } from '@/lib/faker';
import { cn } from '@/lib/utils';
import { faker } from '@faker-js/faker/locale/ko';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Icon from '../common/icon';

const RecruitCard = () => {
  const [temp, setTemp] = useState<any>(null);

  // 임시
  useEffect(() => {
    const generatedImage = generateRandomImageList().url;

    setTemp({
      type: '모델구인',
      imageUrl: generatedImage,
      title: faker.music.songName(),
      location: faker.location.city(),
      date: faker.date.anytime(),
      tagList: Array.from({ length: 7 }, () => faker.music.genre()),
    });
  }, []);

  if (!temp) return null;

  return (
    <div className={cn('flex h-full w-full gap-[12px]')}>
      <Thumbnail imageUrl={temp.imageUrl} />
      <div
        className={cn(
          'flex w-[calc(100%-160px)] flex-[1_1_0] flex-col justify-between gap-[5px]',
        )}
      >
        <div
          className={cn(
            'flex h-[44px] flex-[1_1_0] items-center justify-between',
          )}
        >
          <p
            className={cn(
              'flex self-stretch text-[16px] font-semibold leading-[1.35] text-[#201A17]',
            )}
          >
            {temp.title}
          </p>
          <Icon id="bookmark-icon" className="h-[24px] w-[24px]" />
        </div>
        <div
          className={cn(
            'flex flex-auto flex-col gap-[5px] text-[14px] text-[#7E7774]',
          )}
        >
          <div className={cn('flex items-center gap-[6px]')}>
            <Icon id="location-icon" className="h-[18px] w-[18px]" />
            <span>{temp.location}</span>
          </div>
          <div className={cn('flex items-center gap-[6px]')}>
            <Icon id="time-icon" className="h-[18px] w-[18px]" />
            <span>{temp.date.toDateString()}</span>
          </div>
          <TagList tags={temp.tagList} />
        </div>
      </div>
    </div>
  );
};

const Thumbnail = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className={cn('relative h-[120px] w-[120px] flex-shrink-0')}>
      <Image
        src={imageUrl}
        alt={'recruit image'}
        fill
        className={cn('rounded-[5.565px] object-cover')}
      />
      <div
        className={cn(
          'absolute left-[6px] top-[6px] inline-flex items-center justify-center gap-[8px] rounded-[4px] border border-[#FFF] bg-[rgba(32,26,23,0.70)] px-[7px] py-[5px] text-[10px] leading-normal text-[#FFF]',
        )}
      >
        모델구인
      </div>
    </div>
  );
};

const TagList = ({ tags }: { tags: string[] }) => {
  return (
    <div
      className={cn(
        'scrollbar-hide flex flex-[1_1_0] gap-[4px] overflow-x-auto whitespace-nowrap',
      )}
    >
      {tags.map((tag: string, index: number) => (
        <Tag key={index} label={tag} />
      ))}
    </div>
  );
};

const Tag = ({ label }: { label: string }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-[8px] rounded-[40px] border border-[#B4ADA9] px-[7px] py-[3px] text-[12px] font-normal leading-normal text-[#B4ADA9]',
      )}
    >
      {label}
    </div>
  );
};

export default RecruitCard;
