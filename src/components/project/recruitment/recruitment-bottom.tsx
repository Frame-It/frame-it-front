'use client';

import BottomButton from '@/components/common/bottom-button';
import Drawer from '@/components/common/drawer';
import Guide from '@/components/common/guide';
import Icon from '@/components/common/icon';
import IconButton from '@/components/common/icon-button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { GuestProjectGuide } from '@/constants/guide';
import useDisclosure from '@/hooks/useDisclosure';
import {
  deleteRecruitBookmark,
  postProjectApply,
  postRecruitBookmark,
} from '@/lib/api/project/project-recruitment';
import { cn } from '@/lib/utils';
import { useRecruitStore } from '@/store/recruit-store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface HostBottomProps {
  projectId: number;
}

export const HostBottom: FC<HostBottomProps> = ({ projectId }) => {
  return (
    <>
      <BookmarkButton projectId={projectId} />
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
  hostIdentity,
}: {
  title: string;
  projectId: number;
  hostIdentity: 'PHOTOGRAPHER' | 'MODEL';
}) => {
  return (
    <>
      <BookmarkButton projectId={projectId} />
      <IconButton
        icon={<Icon id={'share-icon'} size={24} className="text-gray-40" />}
      />
      <ApplyDrawer
        title={title}
        projectId={projectId}
        hostIdentity={hostIdentity}
      />
    </>
  );
};

const ApplyDrawer = ({
  title,
  projectId,
  hostIdentity,
}: {
  title: string;
  projectId: number;
  hostIdentity: 'PHOTOGRAPHER' | 'MODEL';
}) => {
  const { isOpen, onOpenChange, onClose } = useDisclosure(false);
  const [content, setContent] = useState('');
  const {
    isOpen: isModalOpen,
    onOpenChange: onModalOpenChange,
    onOpen: onModalOpen,
  } = useDisclosure(false);
  const router = useRouter();

  const handleClickApply = async () => {
    try {
      await postProjectApply(projectId, content);
      onModalOpen();
    } catch (e) {
      alert(e);
    }
  };

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
            {hostIdentity === 'PHOTOGRAPHER' ? '작가' : '모델'}님께 하고싶은 말
          </h1>
          <Textarea
            placeholder="자유롭게 적어주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Guide title="지원 안내" guides={GuestProjectGuide.general} />
        <div
          className={cn(
            'absolute bottom-0 left-0 flex h-[64px] w-full items-center',
          )}
        >
          <Dialog open={isModalOpen} onOpenChange={onModalOpenChange}>
            <DialogTrigger asChild>
              <BottomButton
                variant={'primary'}
                size={'large'}
                label={'신청 하기'}
                disabled={!content}
                onClick={handleClickApply}
              />
            </DialogTrigger>
            <DialogContent className="flex w-[312px] flex-col gap-[6px] px-[12px] pb-[24px] pt-[32px]">
              <div
                className={cn(
                  'font-title-16 flex flex-wrap items-start justify-center self-stretch',
                )}
              >
                신청이 완료되었습니다.
              </div>
              <p
                className={cn(
                  'font-body-14 mb-4 flex justify-center self-stretch text-gray-20',
                )}
              >
                {title}
              </p>
              <BottomButton
                variant={'secondary'}
                size={'middle'}
                label={'확인하기'}
                onClick={() => {
                  router.push(
                    `/project-management/${projectId}?status=RECRUITING&isHost=false`,
                  );
                }}
                className="max-w-none"
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <></>
    </Drawer>
  );
};

interface BookmarkButtonProps {
  projectId: number;
}

const BookmarkButton: FC<BookmarkButtonProps> = ({ projectId }) => {
  const { recruits, toggleBookmark } = useRecruitStore();
  const isBookmarked = recruits.find(
    (recruit) => recruit.id === projectId,
  )?.isBookmarked;

  const handleBookmarkToggle = async () => {
    try {
      if (isBookmarked) {
        await deleteRecruitBookmark(projectId);
      } else {
        await postRecruitBookmark(projectId);
      }
      toggleBookmark(projectId);
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    }
  };

  return (
    <IconButton
      icon={
        <Icon
          id={'bookmark-icon'}
          size={24}
          className="text-gray-40"
          stroke={'#7E7774'}
          fill={isBookmarked ? '#7E7774' : 'white'}
          onClick={handleBookmarkToggle}
        />
      }
    />
  );
};
