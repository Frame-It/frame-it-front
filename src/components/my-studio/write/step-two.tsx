'use client';

import { AutosizeTextarea } from '@/components/ui/auto-size-textarea';
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
import { toast } from '@/components/ui/use-toast';
import {
  PortfolioDetailFormValues,
  portfolioInfoSchema,
} from '@/lib/schema/portfolio-regist-schema';
import { checkDuplicateId } from '@/service/auth-service';
import {
  postPortfolio,
  updatePortfolio,
} from '@/service/client-actions/portfolio';
import { usePortfolioRegisterStore } from '@/store/portfolio-regist-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IStepTwoProps {
  id?: string;
}

// TODO : 프로젝트 수정 시 로직 추가하기
const StepTwo: React.FunctionComponent<IStepTwoProps> = ({ id }) => {
  const router = useRouter();
  const portfolioInfo = usePortfolioRegisterStore(
    (state) => state.portfolioInfo,
  );
  const photoList = usePortfolioRegisterStore((state) => state.photoList);
  const clearData = usePortfolioRegisterStore((state) => state.clear);

  const [tag, setTag] = useState('');
  const [togather, setTogather] = useState('');

  const form = useForm<PortfolioDetailFormValues>({
    resolver: zodResolver(portfolioInfoSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (values: PortfolioDetailFormValues) => {
    if (!id) {
      const newValue = {
        title: values.title,
        description: values.detail || undefined,
        hashtags: values.tagList || undefined,
        togethers: values.togather
          ? Array.from({ length: 1 }, () => values.togather)
          : undefined,
        photos: photoList?.map((el) => el.file),
      };

      const isSuccess = await postPortfolio(newValue);

      if (isSuccess) {
        toast({
          variant: 'success',
          title: '업로드에 성공 하였습니다.',
          duration: 1300,
        });
        clearData();
        router.replace('/my-page/my-studio');
      } else {
        toast({
          variant: 'destructive',
          title: '업로드에 실패 하였습니다.',
          duration: 1300,
        });
      }
    } else {
      const newValue = {
        title: values.title,
        description: values.detail,
        hashtags: values.tagList,
        togethers: values.togather
          ? Array.from({ length: 1 }, () => values.togather)
          : undefined,
        addPhotos: photoList?.filter((el) => el.file).map((el) => el.file),
        deletePhotos: photoList
          ?.filter((el) => el.isDelete)
          .map((el) => el.prevImageUrl),
      };

      const isSuccess = await updatePortfolio(newValue, id);

      if (isSuccess) {
        toast({
          variant: 'success',
          title: '수정에 성공 하였습니다.',
          duration: 1300,
        });
        clearData();
        // router.replace(`/portfolio-detail/${id}`);
        router.refresh();
        router.back();
      } else {
        toast({
          variant: 'destructive',
          title: '수정에 실패 하였습니다.',
          duration: 1300,
        });
      }
    }
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
    const newTagArr = prevTagArr?.filter((el) => el !== tag);
    form.setValue('tagList', newTagArr);
  };

  const addTogather = async () => {
    if (!togather) return;
    const isDuplicate = await checkDuplicateId(togather);

    if (!isDuplicate) {
      setErrorMessage('해당 닉네임은 존재하지 않는 닉네임 입니다.');
      return;
    }

    form.setValue('togather', togather);
    setErrorMessage(null);
    setTogather('');
  };

  const deleteTogather = () => {
    form.setValue('togather', '');
  };

  useEffect(() => {
    form.reset({
      title: portfolioInfo.title || '',
      detail: portfolioInfo.detail || '',
      tagList: portfolioInfo.tagList || undefined,
      togather: portfolioInfo.togather || undefined,
    });
  }, [
    form,
    portfolioInfo.detail,
    portfolioInfo.tagList,
    portfolioInfo.title,
    portfolioInfo.togather,
  ]);

  const values = form.getValues();
  const valid = portfolioInfoSchema.safeParse({ ...values });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-[24px] pb-[66px]"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input
                  placeholder="제목을 입력해 주세요"
                  {...field}
                  className="min-h-[40px]"
                />
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
                <AutosizeTextarea
                  maxHeight={209}
                  minHeight={87}
                  placeholder="포트폴리오 설명을 작성해 주세요"
                  className="w-full"
                  maxLength={500}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tagList"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-[2px]">
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
              <div className="space-y-[2px]">
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
                      onClick={async (e) => {
                        e.preventDefault();
                        await addTogather();
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
                  <p className="font-caption-12 text-destructive">
                    {errorMessage}
                  </p>
                </>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-[360px] bg-white px-[16px] py-[9px] xl:absolute">
          <Button type="submit" className="w-full" disabled={!valid.success}>
            다음
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StepTwo;
