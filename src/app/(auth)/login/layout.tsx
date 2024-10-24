import BackButton from '@/components/common/back-button';
import { Header, HeaderLeft } from '@/components/common/header';
import Icon from '@/components/common/icon';
import { cn } from '@/lib/utils';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn('h-screen-dvh flex flex-col bg-gray-10')}>
      <Header className="border-none bg-transparent">
        <HeaderLeft>
          <BackButton path="/">
            <Icon id={'back-icon'} size={32} className="text-white" />
          </BackButton>
        </HeaderLeft>
      </Header>
      {children}
    </div>
  );
};

export default LoginLayout;
