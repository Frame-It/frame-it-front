import { bottomNavSVG } from '@/constants/icons/bottombar-icon';
import { headerSVG } from '@/constants/icons/header-icon';

const SvgSymbols: React.FunctionComponent = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
    {bottomNavSVG}
    {headerSVG}
  </svg>
);

export default SvgSymbols;
