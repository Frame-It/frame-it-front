'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { faker } from '@faker-js/faker';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface IPortfolioProfileProps {
  userId?: number;
  userName?: string;
  profileImageUrl?: string;
  identity?: string;
}

const PortfolioProfile = ({
  userName,
  userId,
  profileImageUrl,
  identity,
}: IPortfolioProfileProps) => {
  const router = useRouter();

  return (
    <section className="flex w-full items-center justify-between">
      <div
        className="flex items-center gap-x-[12px]"
        onClick={() => router.push(`/studio/${userId}`)}
      >
        <Avatar className="h-[46px] w-[46px] rounded-[4px]">
          <AvatarImage src={profileImageUrl} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-[14px] font-[500] leading-[21px]">{userName}</p>
          <p className="text-[12px] font-[500] leading-[18px]">
            {identity === 'MODEL' ? '모델' : '작가'}
          </p>
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
