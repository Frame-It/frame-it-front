'use client';

import BackButton from '@/components/common/back-button';
import {
  Header,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from '@/components/common/header';
import Icon from '@/components/common/icon';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NickNameFormType, nicknameSchema } from '@/lib/schema/profile-schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ProfilePage() {
  const form = useForm<NickNameFormType>({
    resolver: zodResolver(nicknameSchema),
    defaultValues: {},
    mode: 'onChange',
  });

  const [isDuplicate, setIsDuplicate] = useState(true);
  const [checkDuplicate, setCheckDuplicate] = useState(false);

  const onSubmit = (values: NickNameFormType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  const handleEmailCheck = async (value: string) => {
    if (!value) return;
    setCheckDuplicate(true);
    setIsDuplicate(false);
    // form.setError('nickname', { message: '중복된 닉네임이 있습니다.' });
  };

  const nickname = form.watch('nickname');
  const isDisabled = !!nickname;

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="pt-[58px]">
          <Header>
            <HeaderLeft>
              <BackButton>
                <Icon id="back-icon" className="size-[32px] text-gray-40" />
              </BackButton>
            </HeaderLeft>
            <HeaderCenter>닉네임 변경</HeaderCenter>
            <HeaderRight>
              <button
                disabled={!isDisabled}
                type="submit"
                className="size-[32px] text-primary disabled:text-gray-70"
              >
                완료
              </button>
            </HeaderRight>
          </Header>
          <FormField
            control={form.control}
            name="nickname"
            render={({ field, fieldState }) => {
              const isError = fieldState.error;
              const isValue = !!field.value;

              return (
                <FormItem className="mt-[25px] p-1">
                  <FormLabel>닉네임</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-[20px]">
                      <Input
                        placeholder="닉네임을 입력해 주세요."
                        {...field}
                        value={field.value || ''}
                        className={cn(
                          `rounded-none border border-l-0 border-r-0 border-t-0 border-gray-10 focus-visible:ring-0 focus-visible:ring-offset-0`,
                          fieldState.error && 'border-error',
                        )}
                      />
                      <Button
                        type="button"
                        disabled={!field.value}
                        size="sm"
                        className="px-[12px] py-[8px] text-white disabled:bg-gray-80 disabled:text-gray-20"
                        onClick={() => handleEmailCheck(field.value)}
                      >
                        중복 확인
                      </Button>
                    </div>
                  </FormControl>
                  {!isError && !isValue && (
                    <FormDescription>
                      한글 or 영어로 2~8글자 내로 가능합니다.
                    </FormDescription>
                  )}
                  {!isError && isValue && checkDuplicate && !isDuplicate ? (
                    <FormDescription className="text-sub-green">
                      사용할 수 있는 닉네임 입니다.
                    </FormDescription>
                  ) : null}
                  {!isError && isValue && checkDuplicate && isDuplicate ? (
                    <FormDescription className="text-error">
                      중복된 닉네임 입니다.
                    </FormDescription>
                  ) : null}
                  {!fieldState.error && !!field.value && !checkDuplicate && (
                    <FormDescription className="text-error">
                      닉네임 중복 확인을 해주세요.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </form>
      </Form>
    </main>
  );
}
