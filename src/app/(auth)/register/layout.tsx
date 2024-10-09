import { cn } from '@/lib/utils';
import Icon from '@/components/common/icon';
import BackButton from '@/components/common/back-button';
import { Header, HeaderLeft } from '@/components/common/header';

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn('flex h-screen flex-col')}>
      <Header>
        <HeaderLeft>
          <BackButton>
            <Icon id={'back-icon'} size={32} className="text-gray-20" />
          </BackButton>
        </HeaderLeft>
      </Header>
      {children}
    </div>
  );
};

export default RegisterLayout;
