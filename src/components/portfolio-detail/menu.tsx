'use client';

import Icon from '@/components/common/icon';
import useDisclosure from '@/hooks/useDisclosure';
import { usePathname, useRouter } from 'next/navigation';
import AlertDialog from '../common/alert-dialog';

import { toast } from '../ui/use-toast';
import { IPortfolioDetail } from '@/types/portfolio';
import { deletePortfolio } from '@/service/client-actions/portfolio';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface IPortfolioDetailMenuProps {
  id?: string;
}

const PortfolioDetailMenu: React.FunctionComponent<
  IPortfolioDetailMenuProps
> = ({ id }) => {
  const router = useRouter();
  const pathnameArr = usePathname()
    .split('/')
    .filter((el) => !!el);
  const portfolioId = pathnameArr[1];

  const { isOpen, onClose, onOpen } = useDisclosure(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: '공유 링크가 복사되었어요!',
      duration: 1300,
    });
  };

  const handleEdit = () => {
    router.push(`/portfolio-register?id=${portfolioId}`);
  };
  const handleDelete = () => {
    onOpen();
  };

  return (
    <>
      <Sheet>
        <SheetTrigger className="flex max-w-[360px] items-center justify-center">
          <Icon id="more-icon" size={32} className="text-gray-40" />
        </SheetTrigger>
        <SheetContent className="rounded-t-l-[16px] rounded-t-r-[16px] pb-[20px] pt-[18px]">
          <SheetTitle className="hidden"></SheetTitle>
          <ul className="flex flex-col gap-y-[6px]">
            <li>
              <SheetClose className="w-full p-0">
                <button
                  onClick={handleShare}
                  className="flex w-full items-center gap-x-[13px] px-[18px] py-2 text-base font-semibold leading-[135%] text-gray-20"
                >
                  <Icon id="share-icon" size={24} />
                  포트폴리오 공유하기
                </button>
              </SheetClose>
            </li>
            <li>
              <SheetClose className="w-full p-0">
                <button
                  onClick={handleEdit}
                  className="flex w-full items-center gap-x-[13px] px-[18px] py-2 text-base font-semibold leading-[135%] text-gray-20"
                >
                  <Icon id="edit-icon" size={24} />
                  포트폴리오 수정하기
                </button>
              </SheetClose>
            </li>
            <li>
              <SheetClose className="w-full p-0">
                <button
                  onClick={handleDelete}
                  className="flex w-full items-center gap-x-[13px] px-[18px] py-2 text-base font-semibold leading-[135%] text-gray-20"
                >
                  <Icon id="close-icon" size={24} className="text-gray-40" />
                  포트폴리오 삭제하기
                </button>
              </SheetClose>
            </li>
          </ul>
        </SheetContent>
      </Sheet>

      {/* 삭제 dialog */}
      <AlertDialog
        title="삭제하시겠습니까?"
        desc="삭제하면 게시글을 되돌릴 수 없습니다. \n 신중히 생각하세요"
        cancleTitle="취소"
        confirmTitle="삭제"
        open={isOpen}
        onConfirm={async () => {
          if (id) {
            const isDeleted = await deletePortfolio(id);
            if (isDeleted) {
              toast({
                title: '삭제에 성공했어요!',
                variant: 'success',
                duration: 1300,
              });
              onClose();
              router.back();
            } else {
              toast({
                title: '삭제에 실패했어요!',
                variant: 'destructive',
                duration: 1300,
              });
            }
          }
        }}
        onCancle={() => onClose()}
        onOpenChange={() => onClose()}
      />
    </>
  );
};

export default PortfolioDetailMenu;
