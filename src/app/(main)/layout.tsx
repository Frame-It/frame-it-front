import BottomNavbar from '@/components/common/bottom-navbar';
import { Header, HeaderLeft, HeaderRight } from '@/components/common/header';
import Icon from '@/components/common/icon';
import NotificationButton from '@/components/common/notification-button';
import { getNotification } from '@/service/server-actions/notification';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get('accessToken');
  const notiArr = await getNotification();
  const isRead = notiArr.some((el) => el.isRead);

  return (
    <>
      <Header>
        <HeaderLeft>
          <Link href="/">
            <div className="relative h-[23px] w-[65px]">
              <Image
                src="/logo.png"
                alt="로고"
                priority
                fill
                className="object-contain"
              />
            </div>
          </Link>
        </HeaderLeft>
        <HeaderRight>
          {token ? (
            <NotificationButton className="relative">
              <Icon id="notification-icon" className="h-6 w-6" />
              {isRead ? (
                <div className="absolute -right-[2px] top-0 aspect-square h-2 w-2 rounded-full bg-primary" />
              ) : null}
            </NotificationButton>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-gray-20 px-[10px] py-[6px] text-[14px] text-white"
            >
              로그인
            </Link>
          )}
        </HeaderRight>
      </Header>
      <div className="h-full pb-[66px] pt-[58px] xl:flex-1 xl:p-0">
        {children}
      </div>
      <BottomNavbar />
    </>
  );
}
