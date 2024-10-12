'use client';

import useDisclosure from '@/hooks/useDisclosure';
import { Applicant } from '@/lib/api/project/project-management';
import { cn } from '@/lib/utils';
import { IProject } from '@/types/project.type';
import Icon from '../../common/icon';
import { ProjectApplyGuestItem } from '../apply-member-item';

export const ApplicantList = ({
  projectId,
  applicantList,
}: {
  projectId: IProject['id'];
  applicantList: Applicant[];
}) => {
  const { isOpen, onToggle } = useDisclosure(false);
  return (
    <div className={cn('flex w-full flex-col')}>
      <div className={cn('flex w-full justify-between')}>
        <h1 className={cn('font-title-18 text-gray-20')}>신청자 리스트</h1>
        <Icon
          id={isOpen ? 'arrow-up-icon' : 'arrow-down-icon'}
          size={24}
          onClick={onToggle}
          className={cn('text-gray-40')}
        />
      </div>
      {isOpen && (
        <div className="mt-4 flex-1 divide-y divide-gray-80">
          {applicantList.map((applicant) => (
            <ProjectApplyGuestItem
              key={applicant.applicantId}
              projectId={projectId}
              nickname={applicant.nickname}
              profileImageUrl={applicant.profileImageUrl}
              status={'RECRUITING'}
              appliedAt={applicant.appliedAt}
              applyContent={applicant.applyContent}
              id={applicant.applicantId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
