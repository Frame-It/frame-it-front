import BackButton from '@/components/common/back-button';
import {
  Header,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from '@/components/common/header';
import Icon from '@/components/common/icon';

export default function page() {
  return (
    <main>
      <Header>
        <HeaderLeft>
          <BackButton>
            <Icon id="back-icon" className="size-[32px] text-gray-40" />
          </BackButton>
        </HeaderLeft>
        <HeaderCenter>프로필 편집</HeaderCenter>
        <HeaderRight>
          <button
            disabled
            className="size-[32px] text-primary disabled:text-gray-70"
          >
            완료
          </button>
        </HeaderRight>
      </Header>
    </main>
  );
}
