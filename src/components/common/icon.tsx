import { IConIdType } from '@/constants/icons';

interface IIconProps {
  id: IConIdType;
  size?: number | string;
}

const Icon: React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & IIconProps
> = ({ id, size, ...rest }) => {
  return (
    <svg width={size} height={size} {...rest}>
      <use href={`#${id}`} />
    </svg>
  );
};

export default Icon;
