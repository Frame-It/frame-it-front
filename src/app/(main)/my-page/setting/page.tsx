import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

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
      <section className="mt-[24.5px]">
        <ul className="space-y-[18px]">
          <li className="flex items-center justify-between">
            <div className={basicText}>마케팅 수신/홍보 동의 여부</div>
            <Switch />
          </li>
          <li>
            <Dialog>
              <DialogTrigger className={cn('', basicText)}>Open</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </li>
          <li className={basicText}>회원탈퇴</li>
        </ul>
      </section>
    </main>
  );
}
