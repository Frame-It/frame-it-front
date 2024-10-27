'use client';

import StepOne from '@/components/my-studio/write/step-one';
import StepTwo from '@/components/my-studio/write/step-two';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePreventNavigation } from '@/hooks/use-router-prevent';
import { getPortfolioDetailClient } from '@/service/client-actions/portfolio';
import {
  IPortfolioRegistImage,
  usePortfolioRegisterStore,
} from '@/store/portfolio-regist-store';
import { useEffect } from 'react';

export default function MyStudioWritePage({
  searchParams: { id },
}: {
  searchParams: { id: string };
}) {
  // Search Params로 데이터 불러오기

  const maxStep = usePortfolioRegisterStore((state) => state.maxStep);
  const currentStep = usePortfolioRegisterStore((state) => state.currentStep);

  const setPhoto = usePortfolioRegisterStore((state) => state.setPhoto);
  const setInfo = usePortfolioRegisterStore((state) => state.setPortfolioInfo);

  const storeClear = usePortfolioRegisterStore((state) => state.clear);

  const isDirty = !!currentStep;
  const message =
    '정말 뒤로가기를 누르시겠습니까? 이미 작성된 정보는 저장되지 않습니다!';

  usePreventNavigation(isDirty, message, () => {
    storeClear();
  });

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const data = await getPortfolioDetailClient(id);
        if (data) {
          setInfo({
            title: data.title,
            detail: data.description || undefined,
            tagList: data.hashtags || undefined,
            togather: data.collaborators || undefined,
          });

          const newPhotos: IPortfolioRegistImage[] = [];
          for (const url of data.photosUrl) {
            newPhotos.push({
              isNew: false,
              prevImageUrl: url,
              file: null,
              isDelete: false,
            });
          }
          setPhoto(newPhotos);
        }
      }
    };

    loadData();
  }, [id]);

  return (
    <main>
      <Progress
        value={(currentStep / maxStep) * 100}
        className="fixed z-20 mx-auto max-w-[360px]"
      />
      <ScrollArea className="h-[calc(100dvh-58px-64px)] overflow-y-auto px-[16px] py-[38px] xl:h-[calc(800px-58px-64px)]">
        {currentStep === 1 && <StepOne />}
        {currentStep === 2 && <StepTwo id={id} />}
      </ScrollArea>
    </main>
  );
}
