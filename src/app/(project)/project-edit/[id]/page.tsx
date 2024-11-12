'use client';

import LoadingSpinner from '@/components/common/loading-spinner';
import { Progress } from '@/components/ui/progress';
import { getRecruitAnnouncement } from '@/service/project/recruitment';
import { useProjectRegisterStore } from '@/store/project-regist-store';
import { useParams } from 'next/navigation';
import { Suspense, lazy, useEffect, useState } from 'react';

const StepOne = lazy(() => import('@/components/project/write/step-one'));
const StepTwo = lazy(() => import('@/components/project/write/step-two'));

export default function ProjectEditPage() {
  const currentStep = useProjectRegisterStore((state) => state.currentStep);
  const maxStep = useProjectRegisterStore((state) => state.maxStep);
  const setProjectInfo = useProjectRegisterStore(
    (state) => state.setProjectInfo,
  );

  const [loading, setLoading] = useState(true);

  const params = useParams();
  const projectIdStr = params.id;
  const projectId = Number(projectIdStr);

  useEffect(() => {
    if (projectIdStr) {
      getRecruitAnnouncement(projectId)
        .then((data) => {
          setProjectInfo({
            projectName: data.title,
            type: data.recruitmentRole,
            shootingDate: {
              date: data.shootingAt.split('T')[0],
              period: data.timeOption,
            },
            location: {
              type: data.locationType,
              address: data.address,
              spot: data.spot,
              detail: data.detailedAddress,
            },
            description: data.description,
            retouchingDetails: data.retouchingDescription,
            photos: [],
            photoUrls: data.conceptPhotoUrls,
            conceptTags: data.projectConcepts,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to fetch project data:', error);
          // TODO: 에러 핸들링
        });
    }
  }, [projectId, setProjectInfo]);

  if (loading)
    return (
      <div className="flex h-full justify-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <>
      <Progress
        value={(currentStep / maxStep) * 100}
        className="fixed z-20 mx-auto max-w-[360px]"
      />
      <div className="h-full px-4 pt-6">
        <Suspense fallback={<></>}>
          {currentStep === 1 && <StepOne />}
          {currentStep === 2 && <StepTwo isEdit projectId={projectId} />}
        </Suspense>
      </div>
    </>
  );
}
