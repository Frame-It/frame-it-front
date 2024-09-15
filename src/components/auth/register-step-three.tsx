import { Button } from '@/components/ui/button';
import { useUserRegisterNextStep } from '@/store/user-regist-store';

interface IRegisterStepThreeProps {}

const RegisterStepThree: React.FunctionComponent<
  IRegisterStepThreeProps
> = () => {
  const nextStep = useUserRegisterNextStep();

  return (
    <>
      <Button size="lg" className="absolute bottom-0 w-full" onClick={nextStep}>
        다음
      </Button>
    </>
  );
};

export default RegisterStepThree;
