'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/service/client-actions/my-client';
import { deleteCookie } from 'cookies-next';

export default function LeavePage() {
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleDeleteUser = async () => {
    const isDeleted = await deleteUser(textareaValue);

    if (isDeleted) {
      setIsOpen(true);
      deleteCookie('accessToken');
    } else {
      toast({
        title: '회원 탈퇴가 불가합니다',
        description: '아직 진행중인 프로젝트가 있어요.',
        className: 'bg-error text-white max-w-[250px] text-center',
        duration: 1300,
      });
    }
  };

  return (
    <main className="relative h-[calc(100dvh-78px)] px-4">
      <section className="mt-[20px]">
        <ul className="left-[150%] list-disc space-y-[2px] rounded-[8px] bg-caution px-[12px] py-[10px] text-xs text-gray-20">
          <li className="ml-[12px]">
            회원탈퇴 시, 즉시 탈퇴 처리되며 서비스 이용이 불가합니다.
          </li>
          <li className="ml-[12px]">
            기존 작성한 리뷰는 자동으로 삭제되지 않으며, 탈퇴 이후 회원 정보가
            삭제되어 작성자 본인을 확인할 수 없습니다. 삭제를 원하시면 탈퇴 전에
            직접 삭제 부탁드립니다.
          </li>
        </ul>
        <div className="mt-2 flex items-center space-x-2">
          <Checkbox
            id="check"
            checked={isChecked}
            onCheckedChange={handleCheckboxChange}
            className="border-gray-40 data-[state=checked]:border-gray-20 data-[state=checked]:bg-gray-20"
          />
          <label
            htmlFor="check"
            className="text-base leading-[150%] text-gray-20"
          >
            위 유의 사항을 확인했습니다.
          </label>
        </div>
      </section>
      <section className="mt-[16px]">
        <div className="font-semibold leading-[135%] text-gray-10">
          떠나시는 이유를 알려주세요🥲
        </div>
        <div className="text-sm leading-[150%] text-gray-40">선택사항</div>
        <Textarea
          placeholder={`서비스 탈퇴 사유에 대해 알려주세요.
고객님의 소중한 피드백을 반영하여 더 나은 프레이밋이 되겠습니다.
        `}
          value={textareaValue}
          onChange={handleTextareaChange}
          className="mt-2 resize-none p-[10px]"
        />
      </section>
      <Button
        disabled={!isChecked}
        className="absolute bottom-0 left-0 mx-auto mb-[9px] w-full"
        size="lg"
        onClick={handleDeleteUser}
      >
        회원탈퇴
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="flex max-w-[280px] flex-col items-center justify-center pb-[24px] pt-[32px]">
          <DialogHeader>
            <DialogTitle className="text-center text-lg">
              회원 탈퇴 완료
            </DialogTitle>
            <DialogDescription className="break-keep text-center text-sm">
              그동안 프레이밋을 이용해주셔서 감사합니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="w-full">
            <Button
              className="w-full bg-gray-20 font-normal"
              onClick={() => router.refresh()}
            >
              홈으로 가기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
