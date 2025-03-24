'use client';

import BottomButton, {
  BottomButtonProps,
} from '@/components/common/bottom-button';
import { postCompleteProject } from '@/service/project-management/service';
import { IProject } from '@/types/project.type';
import { useRouter } from 'next/navigation';

const CompleteProjectButton = ({
  projectId,
  isHost,
  ...props
}: { projectId: IProject['id']; isHost: boolean } & Pick<
  BottomButtonProps,
  'size' | 'className' | 'variant'
>) => {
  const router = useRouter();

  const handleClickComplete = async () => {
    try {
      const { projectStatus } = await postCompleteProject(projectId);
      router.replace(
        `/review-register/${projectId}?status=${projectStatus}&isHost=${isHost}`,
      );
    } catch (e) {
      router.replace(
        `/review-register/${projectId}?status=IN_PROGRESS&isHost=${isHost}`,
      );
    }
  };

  return (
    <BottomButton
      label={'프로젝트 완료하기'}
      onClick={handleClickComplete}
      {...props}
    />
  );
};

export default CompleteProjectButton;
