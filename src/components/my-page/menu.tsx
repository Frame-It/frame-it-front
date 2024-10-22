'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import Icon from '../common/icon';

interface IMyPageMenuProps {}

const ICON_SIZE = 24;

const paths: {
  label: string;
  path: string;
  icon: ReactNode;
}[] = [
  {
    label: '마이 스튜디오',
    icon: <Icon size={ICON_SIZE} id={'home-icon'} />,
    path: '/my-page/my-studio',
  },
  {
    label: '프로젝트 관리',
    icon: <Icon size={ICON_SIZE} id={'project-icon'} />,
    path: '/project-management/list',
  },
  {
    label: '북마크',
    icon: (
      <Icon
        size={ICON_SIZE}
        id={'bookmark-icon'}
        fill="none"
        stroke={'#4D4744'}
      />
    ),
    path: '/my-page/book-mark',
  },
  {
    label: '계정 정보',
    icon: <Icon size={ICON_SIZE} id={'setting-icon'} />,
    path: '/my-page/setting',
  },
];

const MyPageMenu: React.FunctionComponent<IMyPageMenuProps> = () => {
  const router = useRouter();

  return (
    <section className="mt-[28px]">
      <div className="text-lg font-semibold leading-[135%]">나의 활동</div>
      <nav className="mt-2">
        <ul className="space-y-1 text-base font-semibold leading-[135%] text-gray-20">
          {paths.map((path) => (
            <li
              key={path.label}
              onClick={() => router.push(path.path)}
              className="flex w-full cursor-pointer items-center gap-x-4 py-[10px] pl-1"
            >
              {path.icon}
              {path.label}
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default MyPageMenu;
