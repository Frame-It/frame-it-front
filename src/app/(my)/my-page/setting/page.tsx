import LogoutDialog from '@/components/setting/logout-dialog';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';

const settingLI = 'space-y-1 px-4 py-[12px]';
const settingDT = 'text-sm font-medium leading-[150%] text-gray-10';
const settingDD = 'text-sm leading-[150%] text-gray-10';

const basicText =
  'relative flex-1 w-full text-sm font-medium leading-[150%] text-gray-10';

export default function SettingPage() {
  // 서버로부터 개인정보 가져옴

  return (
    <main>
      <section className="mt-[20px]">
        <div className="font-semibold leading-[135%] text-gray-10">
          개인정보
        </div>
        <ul className="mt-[12px] rounded-[8px] bg-gray-90">
          <li className={settingLI}>
            <dt className={settingDT}>이름</dt>
            <dd className={settingDD}>박소은</dd>
          </li>
          <li className={settingLI}>
            <dt className={settingDT}>닉네임</dt>
            <dd className={settingDD}>마마원마마원투투</dd>
          </li>
          <li className={settingLI}>
            <dt className={settingDT}>이메일</dt>
            <dd className={settingDD}>qkqh123@naver.com</dd>
          </li>
        </ul>
      </section>
      <section className="mt-[24.5px]">
        <ul className="space-y-[18px]">
          <li className="flex items-center justify-between">
            <div className={basicText}>마케팅 수신/홍보 동의 여부</div>
            <Switch className="h-[24px]" />
          </li>
          <li className={basicText}>
            <LogoutDialog>로그아웃</LogoutDialog>
          </li>
          <li className={basicText}>
            <Link href="/my-page/leave">
              <div className="h-full w-full">회원탈퇴</div>
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
