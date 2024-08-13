'use client';

import Link from 'next/link';
import Icon from './icon';
import { IConIdType } from '@/constants/icons';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

// 원하면 path를 props로
interface IBottomBarProps {}

interface IbottombarPaths {
  path: string;
  name: string;
  iconId: IConIdType;
}
interface INavLinkProps extends IbottombarPaths {
  children?: React.ReactNode;
  active?: boolean;
}

const bottombarPaths: IbottombarPaths[] = [
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
    path: '/letter',
    name: '쪽지',
    iconId: 'talk-icon',
  },
  {
    path: '/my',
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
    <nav className="fixed bottom-0 z-30 flex w-full max-w-[640px] border-t-[1px] border-t-[#ECE9E7] px-[32px] py-[13px]">
      <ul className="flex w-full items-center justify-around">
        {bottombarPaths.map((nav) => (
          <NavLink key={nav.path} active={nav.path === pathName} {...nav} />
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavbar;
