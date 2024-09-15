import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  useUserRegisterSetNickName,
  useUserRegisterStore,
} from '@/store/user-regist-store';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { z } from 'zod';
import { stepFourSchema } from '@/lib/schema/user-regist-schema';

interface IRegisterStepFourProps {}

const RegisterStepFour: React.FunctionComponent<IRegisterStepFourProps> = (
  props,
) => {
  const nickname =
    useUserRegisterStore((state) => state.userInfo.nickname) ?? '';

  const setNickname = useUserRegisterSetNickName();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleButtonClick = async () => {
    // 중복 확인 로직
  };

  const handleSubmit = async () => {
    // 가입 로직
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const isDuplicate = false;

  useEffect(() => {
    if (nickname) {
      try {
        stepFourSchema.parse({
          nickname,
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
  }, [nickname]);

  return (
    <section className="px-6">
      <div className="font-title-18 mt-[42px] max-w-[200px] break-keep">
        <div>프레이밋에서 사용할</div>
        <div>닉네임을 설정해 주세요.</div>
      </div>
      <div className="mt-[40px]">
        <Label
          htmlFor="nickname"
          className="font-caption-12 font-[400] text-gray-20"
        >
          닉네임
        </Label>
        <div className="flex w-full items-center justify-between gap-x-2">
          <Input
            id="nickname"
            placeholder="닉네임을 입력해 주세요"
            className="border-b-1 rounded-none border-l-0 border-r-0 border-t-0 pb-1 pl-1"
            value={nickname}
            onChange={handleChange}
          />
          <Button size="sm" className="font-tag-12 px-[12px] py-2 font-[400]">
            중복 확인
          </Button>
        </div>
        {errorMessage && (
          <p className="font-tag-12 mt-2 text-error">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="font-tag-12 mt-2 text-sub-green">{successMessage}</p>
        )}
      </div>
      <Button size="lg" className="absolute bottom-0 left-0 w-full">
        가입
      </Button>
    </section>
  );
};

export default RegisterStepFour;
