import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  useUserRegisterNextStep,
  useUserRegisterSetRole,
  useUserRegisterStore,
} from '@/store/user-regist-store';
import Icon from '../common/icon';

interface IRegisterStepTwoProps {}

const RoleCommonDiv =
  'h-[120px] w-[120px] flex items-center justify-center rounded-[16px] border-2 border-gray-20 cursor-pointer';
const RoleActiveDiv = 'bg-gray-20 text-white';
const RoleNonActiveDiv = 'bg-white text-gray-20';

const RegisterStepTwo: React.FunctionComponent<IRegisterStepTwoProps> = () => {
  const role = useUserRegisterStore((state) => state.userInfo.role);
  const nextStep = useUserRegisterNextStep();
  const setRole = useUserRegisterSetRole();

  const handleClick = (role: string) => {
    setRole(role);
  };

  return (
    <section className="mt-[32px]">
      <div className="flex w-full items-center justify-center gap-x-6 px-[32px]">
        <button
          className={cn(
            RoleCommonDiv,
            role === 'author' ? RoleActiveDiv : RoleNonActiveDiv,
          )}
          onClick={() => handleClick('author')}
        >
          <Icon id="camera-icon" className="h-[48px] w-[54px] text-current" />
        </button>
        <button
          className={cn(
            RoleCommonDiv,
            role === 'model' ? RoleActiveDiv : RoleNonActiveDiv,
          )}
          onClick={() => handleClick('model')}
        >
          <Icon id="person-icon" className="h-[53px] w-[20px] text-current" />
        </button>
      </div>
      <Button
        size="lg"
        className="absolute bottom-0 w-full"
        disabled={!role}
        onClick={nextStep}
      >
        다음
      </Button>
    </section>
  );
};

export default RegisterStepTwo;
