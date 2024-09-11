'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Icon from '../common/icon';
import { TagList } from '../common/tag-list';

export interface IRecruitCardProps {
  type: '모델구인' | '작가구인';
  imageUrl: string;
  title: string;
  location: string;
  date: string;
  tagList: string[];
}

const RecruitCard = (props: IRecruitCardProps) => {
  return (
    <div className={cn('flex h-full w-full gap-[12px]')}>
      <Thumbnail imageUrl={props.imageUrl} />
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
              'line-clamp-2 overflow-hidden',
            )}
          >
            {props.title}
          </p>

          <Icon
            id="bookmark-icon"
            className="h-[24px] w-[24px] flex-shrink-0"
          />
        </div>
        <div
          className={cn(
            'flex flex-auto flex-col gap-[5px] text-[14px] text-[#7E7774]',
          )}
        >
          <div className={cn('flex items-center gap-[6px]')}>
            <Icon id="location-icon" className="h-[18px] w-[18px]" />
            <span>{props.location}</span>
          </div>
          <div className={cn('flex items-center gap-[6px]')}>
            <Icon id="time-icon" className="h-[18px] w-[18px]" />
            <span>{props.date}</span>
          </div>
          <TagList tags={props.tagList} size={'small'} />
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
        sizes="120px"
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

export default RecruitCard;
