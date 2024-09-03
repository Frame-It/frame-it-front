'use client';

import Icon from '@/components/common/icon';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '../ui/drawer';
import { toast } from '../ui/use-toast';
import { usePathname, useRouter } from 'next/navigation';
import { Dialog, DialogContent } from '../ui/dialog';
import { useState } from 'react';
import { Button } from '../ui/button';
// import Drawer from '@/components/common/drawer';

interface IPortfolioDetailMenuProps {}

const PortfolioDetailMenu: React.FunctionComponent<
  IPortfolioDetailMenuProps
> = () => {
  const router = useRouter();
  const pathnameArr = usePathname()
    .split('/')
    .filter((el) => !!el);
  const portfolioId = pathnameArr[1];

  const [open, setOpen] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: '공유 링크가 복사되었어요!',
    });
  };
  const handleEdit = () => {
    router.push(`/portfolio-register?id=${portfolioId}`);
  };
  const handleDelete = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger className="flex max-w-[360px] items-center justify-center">
          <Icon id="more-icon" size={32} className="text-gray-40" />
        </DrawerTrigger>
        <DrawerContent className="rounded-t-l-[16px] rounded-t-r-[16px] pb-[20px] pt-[18px]">
          <ul className="flex flex-col gap-y-[6px]">
            <li>
              <DrawerClose className="w-full p-0">
                <button
                  onClick={handleShare}
                  className="flex w-full items-center gap-x-[13px] px-[18px] py-2 text-base font-semibold leading-[135%] text-gray-20"
                >
                  <Icon id="share-icon" size={24} />
                  포트폴리오 공유하기
                </button>
              </DrawerClose>
            </li>
            <li>
              <DrawerClose className="w-full p-0">
                <button
                  onClick={handleEdit}
                  className="flex w-full items-center gap-x-[13px] px-[18px] py-2 text-base font-semibold leading-[135%] text-gray-20"
                >
                  <Icon id="edit-icon" size={24} />
                  포트폴리오 수정하기
                </button>
              </DrawerClose>
            </li>
            <li>
              <DrawerClose className="w-full p-0">
                <button
                  onClick={handleDelete}
                  className="flex w-full items-center gap-x-[13px] px-[18px] py-2 text-base font-semibold leading-[135%] text-gray-20"
                >
                  <Icon id="close-icon" size={24} />
                  포트폴리오 삭제하기
                </button>
              </DrawerClose>
            </li>
          </ul>
        </DrawerContent>
      </Drawer>

      {/* 삭제 dialog */}
      <Dialog
        open={open}
        onOpenChange={() => {
          onClose();
        }}
      >
        <DialogContent className="max-w-[280px] rounded-[16px] px-[12px] py-[32px]">
          <div className="text-center">
            <div className="font-semibold leading-[135%] text-gray-10">
              삭제하시겠습니까?
            </div>
            <div className="text-sm leading-[150%]">
              삭제하면 게시글을 되돌릴 수 없습니다.
            </div>
            <div className="text-sm leading-[150%]">신중히 생각하세요</div>
          </div>
          <div className="flex w-full gap-x-2">
            <Button
              variant="ghost"
              className="flex-1 bg-gray-70 font-normal text-white"
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              onClick={async () => {
                onClose();
                router.back();
              }}
              className="flex-1 font-normal"
            >
              삭제
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PortfolioDetailMenu;
