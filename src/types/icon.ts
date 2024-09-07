import { BottomNavIconID } from '@/constants/icons/bottombar-icon';
import { CommonIconID } from '@/constants/icons/common-icon';
import { DrawerIconID } from '@/constants/icons/drawer-icon';
import { HeaderIconID } from '@/constants/icons/header-icon';
import { MypageIconID } from '@/constants/icons/mapage-icon';
import { PortfolioIconID } from '@/constants/icons/portfolio-icon';
import { RecruitIconID } from '@/constants/icons/recruit-icon';

type IconIDTypes =
  | CommonIconID
  | HeaderIconID
  | BottomNavIconID
  | PortfolioIconID
  | RecruitIconID
  | DrawerIconID
  | MypageIconID;

export default IconIDTypes;
