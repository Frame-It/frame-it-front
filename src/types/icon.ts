import { BottomNavIconID } from '@/constants/icons/bottombar-icon';
import { DrawerIconID } from '@/constants/icons/drawer-icon';
import { HeaderIconID } from '@/constants/icons/header-icon';
import { PortfolioIconID } from '@/constants/icons/portfolio-icon';
import { RecruitIconID } from '@/constants/icons/recruit-icon';

// 타입을 포함하는 객체를 기본으로 내보내기
type IconIDTypes =
  | HeaderIconID
  | BottomNavIconID
  | PortfolioIconID
  | RecruitIconID
  | DrawerIconID;

export default IconIDTypes;
