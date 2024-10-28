'use client';

import Icon from '@/components/common/icon';
import { TagList } from '@/components/common/tag-list';
import { IProjectConcept } from '@/constants/project';
import { cn } from '@/lib/utils';
import {
  deleteRecruitBookmark,
  postRecruitBookmark,
} from '@/service/project/recruitment';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';

export interface IRecruitCardProps {
  id: number;
  type: 'MODEL' | 'PHOTOGRAPHER';
  imageUrl: string;
  title: string;
  location: string;
  date: string;
  tagList: IProjectConcept[];
  isBookmarked: boolean;
}

const BookMarkCard = (props: IRecruitCardProps) => {
  const queryClient = useQueryClient();

  const handleBookmarkToggle = async (event: React.MouseEvent) => {
    event.preventDefault();
    try {
      const projectId = props.id;
      if (props.isBookmarked) {
        await deleteRecruitBookmark(projectId);
      } else {
        await postRecruitBookmark(projectId);
      }
      queryClient.invalidateQueries({
        queryKey: ['getBookMarks'],
      });
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    }
  };

  return (
    <Link
      className={cn('flex h-full w-full gap-[12px]')}
      href={`/project-recruitment/${props.id}`}
    >
      <Thumbnail imageUrl={props.imageUrl} type={props.type} />
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
            className={`h-[24px] w-[24px] flex-shrink-0`}
            fill={props.isBookmarked ? '#E45E25' : '#ffffff'}
            stroke={props.isBookmarked ? '#E45E25' : '#7e7774'}
            onClick={handleBookmarkToggle} // Attach click handler
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
    </Link>
  );
};

const Thumbnail = ({
  imageUrl,
  type,
}: {
  imageUrl: string;
  type: 'MODEL' | 'PHOTOGRAPHER';
}) => {
  return (
    <div className={cn('relative h-[120px] w-[120px] flex-shrink-0')}>
      <img
        src={imageUrl}
        alt={'recruit image'}
        sizes="120px"
        className={cn('h-full w-full rounded-[5.565px] object-cover')}
      />
      <div
        className={cn(
          'absolute left-[6px] top-[6px] inline-flex items-center justify-center gap-[8px] rounded-[4px] border border-[#FFF] bg-[rgba(32,26,23,0.70)] px-[7px] py-[5px] text-[10px] leading-normal text-[#FFF]',
        )}
      >
        {type === 'MODEL' ? '모델' : '작가'}구인
      </div>
    </div>
  );
};

export default BookMarkCard;
