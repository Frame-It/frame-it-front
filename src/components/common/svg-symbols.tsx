import { headerSVG } from '@/constants/icons/header-icon';
import { bottomNavSVG } from '@/constants/icons/bottombar-icon';
import { portfolioSVG } from '@/constants/icons/portfolio-icon';

const SvgSymbols: React.FunctionComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
    {bottomNavSVG}
    {headerSVG}
    {portfolioSVG}
  </svg>
);

export default SvgSymbols;
