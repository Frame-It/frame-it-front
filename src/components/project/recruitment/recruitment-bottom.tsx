'use client';

import BottomButton from '@/components/common/bottom-button';
import Drawer from '@/components/common/drawer';
import Guide from '@/components/common/guide';
import Icon from '@/components/common/icon';
import IconButton from '@/components/common/icon-button';
import { Textarea } from '@/components/ui/textarea';
import { GuestProjectGuide } from '@/constants/guide';
import useDisclosure from '@/hooks/useDisclosure';
import { deleteRecruitBookmark, postRecruitBookmark } from '@/lib/api/project';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC, useState } from 'react';

interface HostBottomProps {
  projectId: number;
  isBookmarked: boolean;
}

export const HostBottom: FC<HostBottomProps> = ({
  projectId,
  isBookmarked,
}) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleBookmarkToggle = async () => {
    try {
      if (bookmarked) {
        await deleteRecruitBookmark(projectId);
      } else {
        await postRecruitBookmark(projectId);
      }
      setBookmarked(!bookmarked);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <IconButton
        icon={
          <Icon
            id={'bookmark-icon'}
            size={24}
            className="text-gray-40"
            stroke={'#7E7774'}
            fill={bookmarked ? '#7E7774' : 'white'}
            onClick={handleBookmarkToggle}
          />
        }
      />
      <IconButton
        icon={<Icon id={'edit-icon'} size={24} className="text-gray-40" />}
      />
      <Link href={`/project-management/${projectId}`}>
        <BottomButton
          variant={'secondary'}
          size={'large'}
          label={'신청자 리스트'}
          className="w-[222px]"
        />
      </Link>
    </>
  );
};

export const GuestBottom = ({
  title,
  projectId,
}: {
  title: string;
  projectId: number;
}) => {
  return (
    <>
      <IconButton
        icon={<Icon id={'bookmark-icon'} size={24} className="text-gray-40" />}
      />
      <IconButton
        icon={<Icon id={'share-icon'} size={24} className="text-gray-40" />}
      />
      <ApplyDrawer title={title} projectId={projectId} />
    </>
  );
};

const ApplyDrawer = ({
  title,
  projectId,
}: {
  title: string;
  projectId: number;
}) => {
  const { isOpen, onOpenChange, onClose } = useDisclosure(false);

  return (
    <Drawer
      title={'지원하기'}
      open={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      trigger={
        <BottomButton
          variant={'primary'}
          size={'large'}
          label={'프로젝트 신청하기'}
          className="w-[222px]"
          // disabled={!isNextEnabled}
        />
      }
      className="pb-0"
    >
      <div className={cn('relative flex flex-col gap-3 pb-[74px]')}>
        <div className="font-body-14 flex items-center gap-2 self-stretch rounded-[8px] border-[1px] border-primary p-2 px-3 text-primary">
          {title}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className={cn('font-title-16 text-gray-10')}>
            작가님께 하고싶은 말
          </h1>
          <Textarea placeholder="자유롭게 적어주세요." />
        </div>
        <Guide title="지원 안내" guides={GuestProjectGuide.general} />
        <div
          className={cn(
            'absolute bottom-0 left-0 flex h-[64px] w-full items-center',
          )}
        >
          <BottomButton
            variant={'primary'}
            size={'large'}
            label={'신청 하기'}
          />
        </div>
      </div>
    </Drawer>
  );
};
