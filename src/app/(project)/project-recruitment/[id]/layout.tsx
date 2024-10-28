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
    <>
      <Header>
        <HeaderLeft>
          <BackButton>
            <Icon id={'back-icon'} size={32} className="text-gray-40" />
          </BackButton>
        </HeaderLeft>
      </Header>
      <div className="mt-[56px] h-[calc(100%-58px)] xl:m-0">{children}</div>
    </>

    // <div className={cn('h-screen-dvh flex flex-col')}>
    // </div>
  );
};

export default ProjectRecruitmentDetailLayout;
