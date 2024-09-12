import { Button } from '@/components/ui/button';
import { useUserRegisterStore } from '@/store/user-regist-store';

interface IRegisterStepOneProps {}

const RegisterStepOne: React.FunctionComponent<IRegisterStepOneProps> = () => {
  const userInfo = useUserRegisterStore((state) => state.userInfo);

  return (
    <>
      <Button size="lg" className="absolute bottom-0 w-full">
        다음
      </Button>
    </>
  );
};

export default RegisterStepOne;
