'use client';

import BottomButton from '@/components/common/bottom-button';
import { AutosizeTextarea } from '@/components/ui/auto-size-textarea';
import { SquareCheckbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { deleteApplyProject } from '@/service/project/management';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const CANCEL_REASONS = [
  { label: '신청 정보를 잘못 입력해서', id: 'CR-001' },
  { label: '호스트와 의견이 맞지 않아서', id: 'CR-002' },
  { label: '일정이 맞지 않아서', id: 'CR-003' },
  { label: '기타', id: 'CR-004' },
];

const CancelRegister = ({ projectId }: { projectId: number }) => {
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const router = useRouter();
  const handleCheckboxChange = (id: string, isChecked: boolean) => {
    setSelectedReasons((prev) =>
      isChecked ? [...prev, id] : prev.filter((reason) => reason !== id),
    );
  };

  const handleRegister = async () => {
    try {
      await deleteApplyProject({
        projectId,
        cancelReasons: selectedReasons,
        content,
      });
      router.push('/project-management/list');
    } catch (e) {
      alert(e);
    }
  };
  return (
    <div className={cn('relative flex h-full flex-col gap-4 overflow-hidden')}>
      <div className="mb-[66px] flex flex-col gap-4 overflow-auto">
        <div className="flex h-full flex-col gap-2">
          <h2 className={cn('font-title-18 text-gray-20')}>
            취소 사유를 선택해주세요
          </h2>
          <div className="flex flex-col gap-1">
            {CANCEL_REASONS.map((reason) => (
              <div key={reason.id} className="flex items-center gap-1">
                <SquareCheckbox
                  id={reason.id}
                  checked={selectedReasons.includes(reason.id)}
                  onCheckedChange={(isChecked) =>
                    handleCheckboxChange(reason.id, isChecked as boolean)
                  }
                />
                <div className="font-body-16 text-gray-20">{reason.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-[2px]">
          <h3 className={cn('font-title-16 text-gray-10')}>
            상세 이유를 작성해 주세요
          </h3>
          <span className="font-body-14 text-gray-40">선택사항</span>
          <AutosizeTextarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="자유롭게 적어주세요."
            minHeight={83}
          />
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <BottomButton
          variant={'primary'}
          size={'large'}
          label={'신청 취소하기'}
          onClick={handleRegister}
          disabled={!content || selectedReasons.length === 0}
        />
      </div>
    </div>
  );
};

export default CancelRegister;
