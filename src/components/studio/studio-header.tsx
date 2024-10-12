import Image from 'next/image';
import RoleBadge from '../common/role-badge';

interface IStudioHeaderProps {
  profileUrl: string;
  role: 'author' | 'model';
  nickName: string;
}

const StudioHeader = ({ profileUrl, role }: IStudioHeaderProps) => {
  return (
    <section className="">
      <div className="flex items-center gap-x-[45px]">
        <div className="relative h-[114px] w-[116px] overflow-hidden">
          <Image
            alt="profile-image"
            src={profileUrl}
            fill
            className="rounded-[16px] object-cover"
          />
        </div>
        <div className="flex gap-[32px]">
          <div className="flex flex-col items-center justify-center">
            <dt className="text-[28px]">6</dt>
            <dd className="text-[14px] font-[500]">포트폴리오</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="text-[28px]">6</dt>
            <dd className="text-[14px] font-[500]">프로젝트</dd>
          </div>
        </div>
      </div>
      <div className="mt-[16px] flex items-center gap-x-1">
        <div className="text-[18px] font-semibold">유저 닉네임</div>
        <RoleBadge
          role={role}
          className="flex h-[24px] w-[37px] items-center justify-center whitespace-nowrap rounded-[6px] py-[6px] text-[12px] font-normal"
        />
      </div>
    </section>
  );
};

export default StudioHeader;
