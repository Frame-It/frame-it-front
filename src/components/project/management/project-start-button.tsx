'use client';

import BottomButton from '@/components/common/bottom-button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import useDisclosure from '@/hooks/useDisclosure';
import { cn } from '@/lib/utils';
import { postStartProject } from '@/service/project/management';
import { useRouter, useSearchParams } from 'next/navigation';

const ProjectStartButton = ({
  projectId,
  applicantId,
}: {
  projectId: number;
  applicantId: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    isOpen: isModalOpen,
    onOpenChange: onModalOpenChange,
    onClose: onModalClose,
    onOpen: onModalOpen,
  } = useDisclosure(false);

  const handleClickStart = async () => {
    try {
      await postStartProject(projectId, applicantId);
      const updatedSearchParams = new URLSearchParams(searchParams.toString());
      updatedSearchParams.set('status', 'IN_PROGRESS');
      onModalClose();
      router.replace(`?${updatedSearchParams.toString()}`);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onModalOpenChange}>
      <DialogTrigger asChild>
        <BottomButton
          variant="secondary"
          size="small"
          label={'프로젝트 시작하기'}
          className="font-tag-12 max-w-none flex-1"
          onClick={onModalOpen}
        />
      </DialogTrigger>
      <DialogContent className="flex w-[312px] flex-col gap-[6px] px-[12px] pb-[24px] pt-[32px]">
        <div
          className={cn(
            'font-title-16 flex flex-wrap items-start justify-center self-stretch',
          )}
        >
          {'프로젝트를\u00A0'}
          <span className="text-primary">시작</span>하시나요?
        </div>
        <p
          className={cn(
            'font-body-14 mb-4 flex justify-center self-stretch text-gray-20',
          )}
        >
          열린 프로젝트는 변경할 수 없습니다.
        </p>
        <BottomButton
          variant={'primary'}
          size={'middle'}
          label={'시작하기'}
          onClick={handleClickStart}
          className="max-w-none"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectStartButton;
