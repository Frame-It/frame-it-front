import BackButton from '@/components/common/back-button';
import { Header, HeaderLeft } from '@/components/common/header';
import Icon from '@/components/common/icon';
import { cn } from '@/lib/utils';

const ProjectRecruitmentDetailLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className={cn('flex h-screen flex-col')}>
      <Header>
        <HeaderLeft>
          <BackButton>
            <Icon id={'back-icon'} size={32} className="text-gray-40" />
          </BackButton>
        </HeaderLeft>
      </Header>
      <main className="mb-[16px] mt-[56px] h-full flex-1">{children}</main>
    </div>
  );
};

export default ProjectRecruitmentDetailLayout;
