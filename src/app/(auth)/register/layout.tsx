import BackButton from '@/components/common/back-button';
import { Header, HeaderLeft } from '@/components/common/header';
import Icon from '@/components/common/icon';
import { cn } from '@/lib/utils';

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header className="px-0">
        <HeaderLeft>
          <BackButton>
            <Icon id={'back-icon'} size={32} className="text-gray-20" />
          </BackButton>
        </HeaderLeft>
      </Header>
      <div className={cn('flex h-screen-dvh flex-col')}>{children}</div>
    </>
  );
};

export default RegisterLayout;
