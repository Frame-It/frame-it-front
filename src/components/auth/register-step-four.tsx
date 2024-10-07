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
import { checkDuplicateId, registUser } from '@/service/auth-service';

interface IRegisterStepFourProps {}

const RegisterStepFour: React.FunctionComponent<
  IRegisterStepFourProps
> = () => {
  const userInfo = useUserRegisterStore((state) => state.userInfo);
  const nickname =
    useUserRegisterStore((state) => state.userInfo.nickname) ?? '';
  const setNickname = useUserRegisterSetNickName();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);

  const isDisabled = isDuplicate !== false || errorMessage !== null;

  // 닉네임 중복 확인 핸들러
  const handleButtonClick = async () => {
    if (nickname) {
      const duplicate = await checkDuplicateId(nickname);
      setIsDuplicate(duplicate);
    } else {
      setErrorMessage('닉네임을 입력해 주세요.');
    }
  };

  // 닉네임 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsDuplicate(null);
  };

  // 스킴 검증 및 에러 메시지 처리
  useEffect(() => {
    if (nickname) {
      try {
        stepFourSchema.parse({ nickname });
        setErrorMessage(null);
      } catch (e) {
        if (e instanceof z.ZodError) {
          setErrorMessage(e.errors[0]?.message || '잘못된 입력입니다.');
        }
      }
    }
  }, [nickname]);

  // 중복 확인 결과에 따른 메시지 처리
  useEffect(() => {
    if (isDuplicate === true) {
      setErrorMessage('중복된 닉네임 입니다.');
      setSuccessMessage(null);
    } else if (isDuplicate === false) {
      setErrorMessage(null);
      setSuccessMessage('사용할 수 있는 닉네임 입니다.');
    } else {
      setSuccessMessage(null);
    }
  }, [isDuplicate]);

  // 가입 버튼 클릭 핸들러
  const handleSubmit = async () => {
    const res = await registUser(userInfo);
  };

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
          <Button
            size="sm"
            className="font-tag-12 px-[12px] py-2 font-[400]"
            onClick={handleButtonClick}
          >
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
      <Button
        size="lg"
        className="absolute bottom-0 left-0 w-full"
        disabled={isDisabled}
        onClick={handleSubmit}
      >
        가입
      </Button>
    </section>
  );
};

export default RegisterStepFour;
