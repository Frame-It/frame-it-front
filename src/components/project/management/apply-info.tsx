import { PartnerItem } from '@/components/project/partner-item';
import { cn } from '@/lib/utils';
import { IApplyInfo, IProject } from '@/types/project';

type ApplyInfoProps = IApplyInfo & Pick<IProject, 'state' | 'id'>;

const ApplyInfo = (partner: ApplyInfoProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-3')}>
      <h1 className={cn('font-title-18 text-gray-20')}>
        {partner.partnerRole === 'HOST' ? '신청정보' : '프로젝트 게스트'}
      </h1>
      <PartnerItem {...partner} />
    </div>
  );
};

export default ApplyInfo;
