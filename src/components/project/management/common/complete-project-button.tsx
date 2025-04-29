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
    await postCompleteProject(projectId);
    router.refresh();
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
