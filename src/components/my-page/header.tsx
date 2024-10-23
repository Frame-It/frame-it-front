'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface IMyPageHeaderProps {
  nickName?: string;
  imageUrl?: string;
}

const MyPageHeader = ({ nickName, imageUrl }: IMyPageHeaderProps) => {
  return (
    <section className="mt-[20px] flex items-center gap-x-4">
      <Avatar className="aspect-square size-[100px] rounded-[16px]">
        <AvatarImage src={imageUrl} />
        <AvatarFallback className="aspect-square size-[100px] cursor-pointer rounded-[16px]">
          F
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <div className="text-lg font-semibold leading-[135%] text-gray-10">
          {nickName}
        </div>
        <p className="w-[120px] text-sm font-medium leading-[150%]">
          프레이밋에서 즐거운 촬영을 진행해 보세요!
        </p>
      </div>
    </section>
  );
};

export default MyPageHeader;
