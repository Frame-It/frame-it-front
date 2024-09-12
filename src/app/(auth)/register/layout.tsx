import BackButton from '@/components/common/back-button';
import { Header, HeaderLeft } from '@/components/common/header';
import Icon from '@/components/common/icon';
import { cn } from '@/lib/utils';

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn('flex h-screen flex-col')}>
      <Header>
        <HeaderLeft>
          <BackButton>
            <Icon id={'back-icon'} size={32} />
          </BackButton>
        </HeaderLeft>
      </Header>
      {children}
    </div>
  );
};

export default RegisterLayout;
