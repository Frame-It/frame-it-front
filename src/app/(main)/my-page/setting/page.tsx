import { Switch } from '@/components/ui/switch';

const settingLI = 'space-y-1 px-4 py-[12px]';
const settingDT = 'text-sm font-medium leading-[150%] text-gray-10';
const settingDD = 'text-sm leading-[150%] text-gray-10';

const basicText = 'flex-1 text-sm font-medium leading-[150%] text-gray-10';

export default function SettingPage() {
  // 서버로부터 개인정보 가져옴

  return (
    <main>
      <section className="mt-[20px]">
        <div className="font-semibold leading-[135%] text-gray-10">
          개인정보
        </div>
        <ul className="mt-[12px] bg-gray-90">
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
      <div className="mt-[24.5px] flex items-center justify-between">
        <div className={basicText}>마케팅 수신/홍보 동의 여부</div>
        <Switch />
      </div>
      <div className={basicText}>로그아웃</div>
      <div className={basicText}>회원탈퇴</div>
      {/* logout dialog */}
    </main>
  );
}
