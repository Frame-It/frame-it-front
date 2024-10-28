import { Button } from '@/components/ui/button';
import {
  useUserRegisterNextStep,
  useUserRegisterSetName,
  useUserRegisterStore,
} from '@/store/user-regist-store';
import { Label } from '@/components/ui/label';
import { RegisterDatePicker } from './register-date-picker';
import { Input } from '../ui/input';
import { useEffect, useState } from 'react';
import { stepThreeSchema } from '@/lib/schema/user-regist-schema';
import { z } from 'zod';

interface IRegisterStepThreeProps {}

const StepThreeLabel = 'font-caption-12 text-gray-20 font-[400]';

const RegisterStepThree: React.FunctionComponent<
  IRegisterStepThreeProps
> = () => {
  const birth = useUserRegisterStore((state) => state.userInfo.birth) ?? '';
  const name = useUserRegisterStore((state) => state.userInfo.name) ?? '';

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const nextStep = useUserRegisterNextStep();
  const setName = useUserRegisterSetName();

  const isRequired = birth && name;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (name) {
      try {
        stepThreeSchema.parse({
          name,
        });
        setErrorMessage(null);
      } catch (e) {
        if (e instanceof z.ZodError) {
          e.errors.forEach((err) => {
            setErrorMessage(err.message);
          });
        }
      }
    }
  }, [name]);

  return (
    <section className="flex h-full flex-col justify-between px-4 pb-2">
      <div>
        <div className="font-title-18 ml-2 mt-[42px] max-w-[200px] break-keep">
          <div>이름과 생년월일을</div>
          <div>입력해 주세요.</div>
        </div>
        <div className="mt-[40px] space-y-8">
          <div>
            <Label htmlFor="name" className={StepThreeLabel}>
              이름
            </Label>
            <Input
              id="name"
              placeholder="이름(실명)을 입력해 주세요"
              className="border-b-1 rounded-none border-l-0 border-r-0 border-t-0 pb-1 pl-1"
              value={name}
              onChange={handleChange}
            />
            {errorMessage && (
              <p className="font-tag-12 mt-2 text-error">{errorMessage}</p>
            )}
          </div>
          <div>
            <Label className={StepThreeLabel}>생년월일</Label>
            <div className="mt-[12px] flex">
              <RegisterDatePicker />
            </div>
          </div>
        </div>
      </div>
      <Button
        size="lg"
        className="w-full"
        disabled={!isRequired}
        onClick={nextStep}
      >
        다음
      </Button>
    </section>
  );
};

export default RegisterStepThree;
