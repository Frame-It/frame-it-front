import { faker } from '@faker-js/faker';
import Image from 'next/image';
import * as React from 'react';

interface IMyPageHeaderProps {}

const MyPageHeader: React.FunctionComponent<IMyPageHeaderProps> = () => {
  return (
    <section className="mt-[20px] flex items-center gap-x-4">
      <Image
        src={faker.image.urlPicsumPhotos()}
        alt="프로필 이미지"
        width={100}
        height={100}
        sizes="100px"
        priority
        className="aspect-square rounded-[16px]"
      />
      <div className="space-y-1">
        <div className="text-lg font-semibold leading-[135%] text-gray-10">
          마마원마마원투투
        </div>
        <p className="w-[120px] text-sm font-medium leading-[150%]">
          프레이밋에서 즐거운 촬영을 진행해 보세요!
        </p>
      </div>
    </section>
  );
};

export default MyPageHeader;
