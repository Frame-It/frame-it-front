'use client';

import RoleBadge from '@/components/common/role-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';

interface IMyStudioHeaderProps {
  profileUrl: string;
  role: 'author' | 'model';
  nickName: string;
  portfolioCount: number;
  projectCount: number;
}

const MyStudioHeader: React.FunctionComponent<IMyStudioHeaderProps> = ({
  profileUrl,
  role,
  nickName,
  portfolioCount,
  projectCount,
}) => {
  const router = useRouter();
  return (
    <section className="">
      <div className="flex items-center gap-x-[45px]">
        <Avatar
          className="h-[114px] w-[116px] cursor-pointer rounded-[16px]"
          onClick={() => router.push('/my-page/profile')}
        >
          <AvatarImage src={profileUrl} />
          <AvatarFallback className="rounded-[16px]">F</AvatarFallback>
        </Avatar>
        <div className="flex gap-[32px]">
          <div className="flex flex-col items-center justify-center">
            <dt className="text-[28px]">{portfolioCount}</dt>
            <dd className="text-[14px] font-[500]">포트폴리오</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="text-[28px]">{projectCount}</dt>
            <dd className="text-[14px] font-[500]">프로젝트</dd>
          </div>
        </div>
      </div>
      <div className="mt-[16px] flex items-center gap-x-1">
        <div className="text-[18px] font-semibold">{nickName}</div>
        <RoleBadge
          role={role}
          className="flex h-[24px] w-[37px] items-center justify-center whitespace-nowrap rounded-[6px] py-[6px] text-[12px] font-normal"
        />
      </div>
    </section>
  );
};

export default MyStudioHeader;
