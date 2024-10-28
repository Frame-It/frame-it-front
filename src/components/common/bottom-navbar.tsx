'use client';

import useDisclosure from '@/hooks/useDisclosure';
import { cn } from '@/lib/utils';
import IconIDTypes from '@/types/icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Drawer from './drawer';
import Icon from './icon';
import NotificationGuide from './noti-gide';

interface IBottomBarProps {
  className?: string;
}

interface IBottombarPaths {
  path: string;
  name: string;
  iconId: IconIDTypes;
  isRegist?: boolean;
}
interface INavLinkProps extends IBottombarPaths {
  children?: React.ReactNode;
  active?: boolean;
}

const bottombarPaths: IBottombarPaths[] = [
  {
    path: '/recruit',
    name: '모집',
    iconId: 'search-icon',
  },
  {
    path: '/feed',
    name: '피드',
    iconId: 'feed-icon',
  },
  {
    path: '',
    name: '',
    iconId: 'add-icon',
    isRegist: true,
  },
  {
    path: '/letter',
    name: '쪽지',
    iconId: 'talk-icon',
  },
  {
    path: '/my-page',
    name: '마이',
    iconId: 'profile-icon',
  },
];

const NavLink: React.FunctionComponent<INavLinkProps> = ({
  children,
  path,
  name,
  active,
  iconId,
}) => {
  return (
    <li>
      <Link
        href={path}
        className={cn(
          'flex flex-col items-center justify-center gap-y-[3px] text-[10px] leading-[11.93px]',
          active ? 'text-[#201A17]' : 'text-[#B4ADA9]',
        )}
      >
        <Icon id={iconId} className={cn('h-6 w-6')} />
        <p className="font-bold"> {name}</p>
        {children}
      </Link>
    </li>
  );
};

const BottomNavbar = ({ className }: IBottomBarProps) => {
  const pathName = usePathname().split('/')[1];
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const handleRegist = () => {};

  return (
    <>
      <NotificationGuide />
      <nav
        className={cn(
          'fixed bottom-0 z-30 mx-auto flex h-[64px] w-full max-w-[360px] items-center justify-center border-t-[1px] border-t-[#ECE9E7] bg-white px-[32px] xl:static',
          className,
        )}
      >
        <ul className="flex w-full items-center justify-between">
          {bottombarPaths.map((nav) => {
            if (nav.isRegist) {
              return (
                <Drawer
                  key={nav.name}
                  open={isOpen}
                  onOpenChange={onOpenChange}
                  trigger={
                    <li key={nav.iconId} onClick={handleRegist}>
                      <Icon
                        id={nav.iconId}
                        className={cn('h-[32px] w-[32px] text-[#B4ADA9]')}
                      />
                    </li>
                  }
                >
                  <RegistDrawerContent />
                </Drawer>
              );
            }
            return (
              <NavLink
                key={nav.path}
                active={nav.path === `/${pathName}`}
                {...nav}
              />
            );
          })}
        </ul>
      </nav>
    </>
  );
};

const RegistDrawerContent = () => {
  const menus: {
    iconId: IconIDTypes;
    title: string;
    path: string;
  }[] = [
    {
      iconId: 'search-icon',
      title: '모집글 업로드',
      path: 'project-register',
    },
    {
      iconId: 'feed-icon',
      title: '포트폴리오 업로드',
      path: 'portfolio-register',
    },
  ];

  return (
    <>
      {menus.map((menu, i) => (
        <Link
          key={i}
          className={cn('flex h-10 items-center gap-[13px] self-stretch')}
          href={`/${menu.path}`}
        >
          <Icon id={menu.iconId} size={24} className={cn('text-[#7E7774]')} />
          <span
            className={cn(
              'font-pretendard text-[16px] font-semibold leading-[135%] text-[#4D4744]',
            )}
          >
            {menu.title}
          </span>
        </Link>
      ))}
    </>
  );
};

export default BottomNavbar;
