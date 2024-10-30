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
import { toast } from '@/components/ui/use-toast';
import { NickNameFormType, nicknameSchema } from '@/lib/schema/profile-schema';
import { cn } from '@/lib/utils';
import { checkDuplicateId } from '@/service/auth-service';
import {
  getUserProfileClient,
  updateNickname,
} from '@/service/client-actions/my-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ProfilePage() {
  const { data } = useQuery({
    queryKey: ['getProfile'],
    queryFn: getUserProfileClient,
    staleTime: 0,
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<NickNameFormType>({
    resolver: zodResolver(nicknameSchema),
    defaultValues: {
      nickname: data?.nickname || '',
    },
    mode: 'onChange',
  });

  const [isDuplicate, setIsDuplicate] = useState(true);
  const [checkDuplicate, setCheckDuplicate] = useState(false);

  const onSubmit = async (values: NickNameFormType) => {
    const isSuccess = await updateNickname({
      id: data?.id || null,
      nickname: values.nickname,
    });

    if (isSuccess) {
      toast({
        title: '닉네임 변경에 성공하였습니다',
        variant: 'success',
        duration: 1300,
      });
      queryClient.invalidateQueries({ queryKey: ['getProfile'] });
      router.replace('/my-page');
    } else {
      toast({
        title: '닉네임 변경에 실패하였습니다',
        variant: 'destructive',
        duration: 1300,
      });
    }
  };

  const handleEmailCheck = async (value: string) => {
    if (!value) return;

    const isDuplicated = await checkDuplicateId(value);

    if (isDuplicated) {
      form.setError('nickname', { message: '중복된 닉네임이 있습니다.' });
      setCheckDuplicate(true);
      setIsDuplicate(true);
    } else {
      setCheckDuplicate(true);
      setIsDuplicate(false);
      form.clearErrors();
    }
  };

  const nickname = form.watch('nickname');
  const isValid = nicknameSchema.safeParse({ nickname }).success;

  const isDisabled = !isValid || isDuplicate || !checkDuplicate;

  return (
    <main className="pt-[58px] xl:flex-1 xl:py-0">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Header>
            <HeaderLeft>
              <BackButton>
                <Icon id="back-icon" className="size-[32px] text-gray-40" />
              </BackButton>
            </HeaderLeft>
            <HeaderCenter>닉네임 변경</HeaderCenter>
            <HeaderRight>
              <button
                disabled={isDisabled}
                type="submit"
                className="size-[32px] text-primary disabled:text-gray-70"
              >
                완료
              </button>
            </HeaderRight>
          </Header>
          <div className="px-4">
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
                          onChangeCapture={() => {
                            setIsDuplicate(true);
                            setCheckDuplicate(false);
                          }}
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
          </div>
        </form>
      </Form>
    </main>
  );
}
