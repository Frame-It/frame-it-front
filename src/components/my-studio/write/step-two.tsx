'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  PortfolioDetailFormValues,
  portfolioInfoSchema,
} from '@/lib/schema/portfolio-regist-schema';
import { usePortfolioRegisterStore } from '@/store/portfolio-regist-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IStepTwoProps {}
<></>;

const StepTwo: React.FunctionComponent<IStepTwoProps> = () => {
  const portfolioInfo = usePortfolioRegisterStore(
    (state) => state.portfolioInfo,
  );
  const setPortfolioInfo = usePortfolioRegisterStore(
    (state) => state.setPortfolioInfo,
  );

  const [tag, setTag] = useState('');
  const [togather, setTogather] = useState('');

  const form = useForm<PortfolioDetailFormValues>({
    resolver: zodResolver(portfolioInfoSchema),
  });

  const onSubmit = (values: PortfolioDetailFormValues) => {
    console.log(values);
    console.log(portfolioInfo);
    console.log(setPortfolioInfo);
  };

  const addTag = () => {
    if (!tag) return;
    const prevTagArr = form.getValues('tagList') || [];
    if (prevTagArr.includes(tag) || prevTagArr.length >= 5) return;

    const newTagArr = [...prevTagArr, tag];
    form.setValue('tagList', newTagArr);
    setTag('');
  };

  const deleteTag = (tag: string) => {
    const prevTagArr = form.getValues('tagList');
    const newTagArr = prevTagArr.filter((el) => el !== tag);
    form.setValue('tagList', newTagArr);
  };

  const addTogather = () => {
    if (!togather) return;
    form.setValue('togather', togather);
    setTogather('');
  };

  const deleteTogather = () => {
    form.setValue('togather', '');
  };

  const [isFormValid, setIsFormValid] = useState(false);

  // 폼 필드 값이 변경될 때마다 모든 필드의 유효성을 검사하는 useEffect
  useEffect(() => {
    const subscription = form.watch(() => {
      const values = form.getValues();
      const result = portfolioInfoSchema.safeParse(values);
      setIsFormValid(result.success);
    });

    return () => subscription.unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, [form.watch, form.getValues]);

  console.log(isFormValid);
  // console.log(form.getValues());

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-[16px] space-y-[24px] pb-[66px]"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="제목을 입력해 주세요" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="detail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>상세 내용</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="포트폴리오 설명을 작성해 주세요"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tagList"
          render={() => (
            <FormItem>
              <div>
                <FormLabel>해시태그</FormLabel>
                <FormDescription>최대 5개까지 입력 가능해요</FormDescription>
              </div>
              <FormControl>
                <>
                  <div className="flex items-center gap-x-[8px]">
                    <Input
                      onChange={(e) => {
                        setTag(e.target.value);
                      }}
                      value={tag}
                      onKeyDown={(e) => {
                        if (e.key === ' ') {
                          e.preventDefault();
                          addTag();
                        }
                      }}
                      placeholder="컨셉을 표현할 태그를 입력해 주세요"
                    />
                    <Button
                      variant="secondary"
                      size="lg"
                      type="button"
                      className="w-[65px]"
                      onClick={(e) => {
                        e.preventDefault();
                        if (!tag) return;
                        addTag();
                      }}
                    >
                      등록
                    </Button>
                  </div>
                  <div className="mt-2 flex w-full flex-wrap items-center gap-x-2 gap-y-2">
                    {field?.value?.map((tag, i) => (
                      <Badge key={tag + i} variant="tag">
                        {tag}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteTag(tag);
                          }}
                        >
                          <XIcon size={18} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="togather"
          render={() => (
            <FormItem>
              <div>
                <FormLabel>함께한 사람</FormLabel>
                <FormDescription>
                  프레이밋에서 함께한 유저 닉네임을 입력해 주세요
                </FormDescription>
              </div>
              <FormControl>
                <>
                  <div className="flex items-center gap-x-[8px]">
                    <Input
                      value={togather}
                      onChange={(e) => {
                        e.preventDefault();
                        setTogather(e.target.value);
                      }}
                      placeholder="닉네임을 입력해 주세요"
                    />
                    <Button
                      variant="secondary"
                      size="lg"
                      type="button"
                      className="w-[65px]"
                      onClick={(e) => {
                        e.preventDefault();
                        addTogather();
                      }}
                    >
                      등록
                    </Button>
                  </div>
                  <div className="mt-2 flex w-full flex-wrap items-center gap-x-2 gap-y-2">
                    {form.getValues('togather') && (
                      <Badge variant="tag">
                        {form.getValues('togather')}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteTogather();
                          }}
                        >
                          <XIcon size={18} />
                        </button>
                      </Badge>
                    )}
                  </div>
                </>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="fixed inset-x-0 bottom-0 w-full max-w-[640px] bg-white px-[16px] py-[9px]">
          <Button type="submit" className="w-full" disabled={!isFormValid}>
            다음
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StepTwo;
