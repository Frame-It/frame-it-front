import { IApplyInfo, IProject } from '@/types/project';
import BottomButton from '../common/bottom-button';

type PartnerProps = IApplyInfo & Pick<IProject, 'state'>;

export const PartnerItem: React.FunctionComponent<PartnerProps> = ({
  profileImage,
  name,
  applicationDate,
  content,
  state,
  partnerRole,
}) => {
  return (
    <div className="flex gap-[10px] py-4">
      <div className="flex-shrink-0">
        <img
          src={profileImage}
          alt={`${name}'s profile`}
          className="h-[46px] w-[46px] rounded-[8px] object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 justify-between">
          <h3 className="font-body-14m text-gray-20">{name}</h3>
          <span className="font-caption-12 text-gray-40">
            신청일 {applicationDate}
          </span>
        </div>
        <p className="font-body-14 mb-2 mt-1 text-gray-40">{content}</p>
        {partnerRole === 'HOST' ? (
          <GuestPartnerButton />
        ) : (
          <HostPartnerButtons state={state} />
        )}
      </div>
    </div>
  );
};

const HostPartnerButtons = ({ state }: { state: IProject['state'] }) => {
  return (
    <div className="flex gap-[6px]">
      {state === 'complete' ? (
        <BottomButton
          variant={'stroke'}
          disabled
          size={'small'}
          label={'리뷰 확인하기'}
          className="font-tag-12 max-w-none flex-1"
        />
      ) : (
        <BottomButton
          variant="stroke"
          size="small"
          label={'DM'}
          className="font-tag-12 max-w-none flex-1"
        />
      )}
      {state === 'recruiting' && (
        <BottomButton
          variant="secondary"
          size="small"
          label={'프로젝트 시작하기'}
          className="font-tag-12 max-w-none flex-1"
        />
      )}
    </div>
  );
};

const GuestPartnerButton = () => {
  return (
    <div className="flex gap-[6px]">
      <BottomButton
        variant="stroke"
        size="small"
        label={'신청 취소하기'}
        className="font-tag-12 max-w-none flex-1"
      />
    </div>
  );
};
