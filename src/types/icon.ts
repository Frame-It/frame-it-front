import { BottomNavIconID } from '@/constants/icons/bottombar-icon';
import { CommonIconID } from '@/constants/icons/common-icon';
import { DrawerIconID } from '@/constants/icons/drawer-icon';
import { HeaderIconID } from '@/constants/icons/header-icon';
import { MypageIconID } from '@/constants/icons/mypage-icon';
import { PortfolioIconID } from '@/constants/icons/portfolio-icon';
import { ProjectIconID } from '@/constants/icons/project-icon';

type IconIDTypes =
  | CommonIconID
  | HeaderIconID
  | BottomNavIconID
  | PortfolioIconID
  | ProjectIconID
  | DrawerIconID
  | MypageIconID;

export default IconIDTypes;
