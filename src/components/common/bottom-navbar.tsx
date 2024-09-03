'use client';

import Link from 'next/link';
import Icon from './icon';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import IconIDTypes from '@/types/icon';

// 원하면 path를 props로
interface IBottomBarProps {}

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
    path: '/',
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
    path: '/my-studio',
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

const BottomNavbar: React.FunctionComponent<IBottomBarProps> = () => {
  const pathName = usePathname();

  return (
    <nav className="fixed bottom-0 z-30 mx-auto flex h-[64px] w-full max-w-[360px] border-t-[1px] border-t-[#ECE9E7] bg-white px-[32px]">
      <ul className="flex w-full items-center justify-between">
        {bottombarPaths.map((nav) => {
          if (nav.isRegist) {
            return (
              <li key={nav.iconId}>
                <Icon
                  id={nav.iconId}
                  className={cn('h-[32px] w-[32px] text-[#B4ADA9]')}
                />
              </li>
            );
          }
          return (
            <NavLink key={nav.path} active={nav.path === pathName} {...nav} />
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNavbar;
