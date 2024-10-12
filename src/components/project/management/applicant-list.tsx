import useDisclosure from '@/hooks/useDisclosure';
import { cn } from '@/lib/utils';
import { faker } from '@faker-js/faker/locale/ko';
import Icon from '../../common/icon';
import { PartnerItem } from '../partner-item';

export const ApplicantList = () => {
  const { isOpen, onToggle } = useDisclosure(false);
  const applicants = Array.from({ length: 3 }).map(() => ({
    profileImage: faker.image.avatar(),
    name: faker.name.fullName(),
    applicationDate: faker.date.recent().toISOString().split('T')[0],
    content: faker.lorem.sentence(),
  }));
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
          {applicants.map((applicant, index) => (
            <PartnerItem
              id={applicant.name}
              key={index}
              profileImage={applicant.profileImage}
              name={applicant.name}
              applicationDate={applicant.applicationDate}
              content={applicant.content}
              state={'recruiting'}
              partnerRole="GUEST"
            />
          ))}
        </div>
      )}
    </div>
  );
};
