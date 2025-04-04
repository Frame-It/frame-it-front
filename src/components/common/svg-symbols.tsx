import { bottomNavSVG } from '@/constants/icons/bottombar-icon';
import { commonSVG } from '@/constants/icons/common-icon';
import { drawerSVG } from '@/constants/icons/drawer-icon';
import { headerSVG } from '@/constants/icons/header-icon';
import { mypageSVG } from '@/constants/icons/mypage-icon';
import { portfolioSVG } from '@/constants/icons/portfolio-icon';
import { projectSVG } from '@/constants/icons/project-icon';

const SvgSymbols: React.FunctionComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
    {commonSVG}
    {bottomNavSVG}
    {headerSVG}
    {portfolioSVG}
    {projectSVG}
    {drawerSVG}
    {mypageSVG}
  </svg>
);

export default SvgSymbols;
