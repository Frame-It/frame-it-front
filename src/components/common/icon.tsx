import IconIDTypes from '@/types/icon';

interface IIconProps {
  id: IconIDTypes;
  size?: number | string;
  className?: string;
}

const Icon: React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & IIconProps
> = ({ id, size, className, ...rest }) => {
  return (
    <svg width={size} height={size} {...rest} className={className}>
      <use href={`#${id}`} />
    </svg>
  );
};

export default Icon;
