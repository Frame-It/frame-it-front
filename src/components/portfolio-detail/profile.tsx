import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { faker } from '@faker-js/faker';
import Image from 'next/image';

interface IPortfolioProfileProps {}

const PortfolioProfile: React.FunctionComponent<
  IPortfolioProfileProps
> = () => {
  // props로 데이터를 받아올 수 있음
  const temp = {
    imageUrl: faker.image.avatarLegacy(),
    nickName: faker.person.fullName(),
    role: '작가',
  };
  return (
    <section className="flex w-full items-center justify-between">
      <div className="flex items-center gap-x-[12px]">
        <Avatar className="h-[46px] w-[46px] rounded-[4px]">
          <AvatarImage src={temp.imageUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-[14px] font-[500] leading-[21px]">
            {temp.nickName}
          </p>
          <p className="text-[12px] font-[500] leading-[18px]">{temp.role}</p>
        </div>
      </div>
      <Image
        src="/png/certification-mark.png"
        alt="활동마크"
        width={33}
        height={33}
        className="aspect-square"
      />
    </section>
  );
};

export default PortfolioProfile;
