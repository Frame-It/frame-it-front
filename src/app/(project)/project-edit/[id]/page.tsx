'use client';

import { Progress } from '@/components/ui/progress';
import { getRecruitAnnouncement } from '@/lib/api/project/project-recruitment';
import { useProjectRegisterStore } from '@/store/project-regist-store';
import { useParams } from 'next/navigation';
import { Suspense, lazy, useEffect } from 'react';

const StepOne = lazy(() => import('@/components/project/write/step-one'));
const StepTwo = lazy(() => import('@/components/project/write/step-two'));

export default function ProjectEditPage() {
  const currentStep = useProjectRegisterStore((state) => state.currentStep);
  const maxStep = useProjectRegisterStore((state) => state.maxStep);
  const setProjectInfo = useProjectRegisterStore(
    (state) => state.setProjectInfo,
  );

  const params = useParams();
  const projectId = params.id;

  // 데이터 가져오기 및 초기화
  useEffect(() => {
    if (projectId) {
      getRecruitAnnouncement(Number(projectId))
        .then((data) => {
          // API 응답에 따라 store 초기값 설정
          setProjectInfo({
            projectName: data.title,
            type: data.recruitmentRole,
            shootingDate: {
              date: data.shootingAt.split('T')[0],
              time: data.shootingAt.split('T')[1],
              period: data.timeOption,
            },
            location: {
              type: data.locationType,
              address: data.spot,
              detail: '',
            },
            description: data.description,
            retouchingDetails: data.retouchingDescription,
            photos: [],
            photoUrls: data.conceptPhotoUrls,
            conceptTags: data.projectConcepts,
          });
        })
        .catch((error) => {
          console.error('Failed to fetch project data:', error);
          // TODO: 에러 핸들링
        });
    }
  }, [projectId, setProjectInfo]);

  return (
    <>
      <Progress
        value={(currentStep / maxStep) * 100}
        className="fixed z-20 mx-auto max-w-[360px]"
      />
      <div className="h-full px-4 pt-6">
        <Suspense fallback={<div>Loading...</div>}>
          {currentStep === 1 && <StepOne />}
          {currentStep === 2 && <StepTwo />}
        </Suspense>
      </div>
    </>
  );
}
