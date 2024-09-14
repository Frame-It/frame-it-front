import { Button } from '@/components/ui/button';
import {
  TCheckListKeys,
  useUserRegisterNextStep,
  useUserRegisterStore,
  useUserRegisterToggleAllCheck,
  useUserRegisterToggleItemCheck,
} from '@/store/user-regist-store';
import { UserRegisterCheckbox } from '../ui/checkbox';
import { Label } from '@/components/ui/label';
import Icon from '../common/icon';

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
  const setItemCheck = useUserRegisterToggleItemCheck();

  const handleCheckedChange = (item: TCheckListKeys, checked: boolean) => {
    setItemCheck(item, checked);
  };

  return (
    <section className="mt-[32px]">
      <div className="font-body-14m flex items-center gap-x-[12px] rounded-[8px] border px-[12px] py-[13px] text-gray-10">
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
          <Icon id="right-arrow-icon" className="size-[15px]" />
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
          <Icon id="right-arrow-icon" className="size-[15px]" />
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
      <Button
        size="lg"
        className="absolute bottom-0 w-full"
        disabled={!requiredChecked}
        onClick={nextStep}
      >
        다음
      </Button>
    </section>
  );
};

export default RegisterStepOne;
