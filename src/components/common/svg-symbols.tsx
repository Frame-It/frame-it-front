import { bottomNavSVG } from '@/constants/icons/bottombar-icon';
import { drawerSVG } from '@/constants/icons/drawer-icon';
import { headerSVG } from '@/constants/icons/header-icon';
import { portfolioSVG } from '@/constants/icons/portfolio-icon';
import { recruitSVG } from '@/constants/icons/recruit-icon';

const SvgSymbols: React.FunctionComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
    {bottomNavSVG}
    {headerSVG}
    {portfolioSVG}
    {recruitSVG}
    {drawerSVG}
  </svg>
);

export default SvgSymbols;
