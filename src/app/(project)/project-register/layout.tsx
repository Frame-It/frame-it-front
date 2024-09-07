import BackButton from '@/components/common/back-button';
import {
  Header,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from '@/components/common/header';
import Icon from '@/components/common/icon';

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header className="border-none text-lg shadow-none">
        <HeaderLeft>
          <BackButton className="flex items-center justify-center">
            <Icon id="back-icon" className="size-[32px] text-gray-40" />
          </BackButton>
        </HeaderLeft>
        <HeaderCenter>프로젝트 등록</HeaderCenter>
        <HeaderRight>
          <div className="size-[32px]"></div>
        </HeaderRight>
      </Header>
      <main className="mb-[16px] mt-[56px]">{children}</main>
    </>
  );
}
