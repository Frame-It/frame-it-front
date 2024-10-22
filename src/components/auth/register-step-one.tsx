import { Button } from '@/components/ui/button';
import {
  TCheckListKeys,
  useUserRegisterNextStep,
  useUserRegisterStore,
  useUserRegisterToggleAllCheck,
  useUserRegisterToggleItemCheck,
} from '@/store/user-regist-store';
import { UserRegisterCheckbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Icon from '@/components/common/icon';
import Link from 'next/link';

interface IRegisterStepOneProps {}

const StepOneLI = 'flex items-center justify-between w-full';
const StepOneSpan = 'flex items-center gap-x-4';
const StepOneLabel = 'font-body-14 font-[400]';

const RegisterStepOne: React.FunctionComponent<IRegisterStepOneProps> = () => {
  const userInfo = useUserRegisterStore((state) => state.userInfo);

  const AllChecked =
    userInfo.agreeList.age &&
    userInfo.agreeList.info &&
    userInfo.agreeList.use &&
    userInfo.agreeList.marketing;

  const requiredChecked =
    userInfo.agreeList.age && userInfo.agreeList.info && userInfo.agreeList.use;

  const nextStep = useUserRegisterNextStep();
  const toggleAllcheck = useUserRegisterToggleAllCheck();
  const toggleItemCheck = useUserRegisterToggleItemCheck();

  const handleCheckedChange = (item: TCheckListKeys, checked: boolean) => {
    toggleItemCheck(item, checked);
  };

  return (
    <section className="flex h-[calc(100dvh-58px)] flex-col justify-between pb-2">
      <div>
        <div className="font-title-18 ml-2 mt-[42px] max-w-[200px] break-keep">
          <div>안녕하세요!</div>
          <div>프레이밋 서비스 이용을 위해</div>
          <div>동의해 주세요.</div>
        </div>
        <div className="font-body-14m mt-[32px] flex items-center gap-x-[12px] rounded-[8px] border px-[12px] py-[13px] text-gray-10">
          <UserRegisterCheckbox
            id="allCheck"
            checked={AllChecked}
            onCheckedChange={toggleAllcheck}
          />
          <Label htmlFor="allCheck">모든 약관에 동의합니다.</Label>
        </div>
        <ul className="mt-[32px] space-y-6">
          <li className={StepOneLI}>
            <span className={StepOneSpan}>
              <UserRegisterCheckbox
                id="ageCheck"
                isNotBackground
                checked={userInfo.agreeList.age}
                onCheckedChange={(check) => {
                  handleCheckedChange('age', check as boolean);
                }}
              />
              <Label htmlFor="ageCheck" className={StepOneLabel}>
                만 14세 이상입니다.
              </Label>
            </span>
          </li>
          <li className={StepOneLI}>
            <span className={StepOneSpan}>
              <UserRegisterCheckbox
                id="useCheck"
                isNotBackground
                checked={userInfo.agreeList.use}
                onCheckedChange={(check) => {
                  handleCheckedChange('use', check as boolean);
                }}
              />
              <Label htmlFor="useCheck" className={StepOneLabel}>
                (필수) 이용약관에 동의합니다.
              </Label>
            </span>
            <Link
              target="_blank"
              href="https://frameit.notion.site/fb50555b39f24ac0b735e4d6e882767d"
            >
              <Icon id="right-arrow-icon" className="size-[15px]" />
            </Link>
          </li>
          <li className={StepOneLI}>
            <span className={StepOneSpan}>
              <UserRegisterCheckbox
                id="infoCheck"
                isNotBackground
                checked={userInfo.agreeList.info}
                onCheckedChange={(check) => {
                  handleCheckedChange('info', check as boolean);
                }}
              />
              <Label htmlFor="infoCheck" className={StepOneLabel}>
                (필수) 개인정보처리방침에 동의합니다.
              </Label>
            </span>
            <Link
              target="_blank"
              href="https://frameit.notion.site/9db4e942750a419c8079a79806a03113"
            >
              <Icon id="right-arrow-icon" className="size-[15px]" />
            </Link>
          </li>
          <li className={StepOneLI}>
            <span className={StepOneSpan}>
              <UserRegisterCheckbox
                id="maketingCheck"
                isNotBackground
                checked={userInfo.agreeList.marketing}
                onCheckedChange={(check) => {
                  handleCheckedChange('marketing', check as boolean);
                }}
              />
              <Label htmlFor="maketingCheck" className={StepOneLabel}>
                (선택) 마케팅, 뉴스레터 수신에 동의합니다.
              </Label>
            </span>
          </li>
        </ul>
      </div>
      <Button
        size="lg"
        className="w-full"
        disabled={!requiredChecked}
        onClick={nextStep}
      >
        다음
      </Button>
    </section>
  );
};

export default RegisterStepOne;
