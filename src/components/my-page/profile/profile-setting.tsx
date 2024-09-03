'use client';

import { CustomCheckbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { profileConcepts } from '@/constants/profile';
import { ProfileFormType } from '@/lib/schema/profile-schema';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { UseFormReturn } from 'react-hook-form';

interface IProfilSettingProps {
  form: UseFormReturn<ProfileFormType>;
}

const wrapper = 'space-y-2';
const wrapperTitle = 'text-gray-10 font-semibold leading-[135%]';
const wrapperDesc = 'text-gray-40 leading-[150%] text-sm font-medium';

const ProfilSetting: React.FunctionComponent<IProfilSettingProps> = ({
  form,
}) => {
  const router = useRouter();

  return (
    <section className="mt-6">
      <dl className="space-y-[20px]">
        <div className={wrapper}>
          <dt className={wrapperTitle}>닉네임</dt>
          <dd
            className={cn(
              'flex w-full items-center justify-between',
              wrapperDesc,
            )}
          >
            사진마스터
            <button
              onClick={() => router.push('/my-page/nickname')}
              className="flex items-center justify-center rounded-[8px] bg-gray-80 px-[12px] py-2 text-xs text-gray-20"
            >
              닉네임 변경
            </button>
          </dd>
        </div>
        <div className={wrapper}>
          <dt className={wrapperTitle}>활동유형</dt>
          <dd className={wrapperDesc}>작가</dd>
        </div>
        <div className={wrapper}>
          <dt className={wrapperTitle}>자기소개</dt>
          <dd className={cn('', wrapperDesc)}>
            <FormField
              control={form.control}
              name="introduce"
              render={({ field }) => (
                <FormItem className="p-1">
                  <FormControl>
                    <Textarea
                      placeholder="자기소개를 작성해 주세요"
                      className="resize-none p-[10px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </dd>
        </div>
        <div className={wrapper}>
          <dt className={wrapperTitle}>촬영 컨셉</dt>
          <dd className={wrapperDesc}>
            <FormField
              control={form.control}
              name="concepts"
              render={() => (
                <FormItem className="flex flex-wrap items-center gap-2 space-y-0">
                  {profileConcepts.map((item) => (
                    <FormField
                      key={item.value}
                      control={form.control}
                      name="concepts"
                      render={({ field }) => {
                        return (
                          <FormItem id={item.value} key={item.value}>
                            <FormControl>
                              <CustomCheckbox
                                checked={field.value?.includes(item.value)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        item.value,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.value,
                                        ),
                                      );
                                }}
                              >
                                {item.name}
                              </CustomCheckbox>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </FormItem>
              )}
            />
          </dd>
        </div>
      </dl>
    </section>
  );
};

export default ProfilSetting;
