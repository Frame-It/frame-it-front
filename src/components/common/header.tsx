interface IHeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

const Header: React.FunctionComponent<IHeaderProps> = ({
  left,
  center,
  right,
}) => {
  return (
    <nav className="fixed top-0 mx-auto flex h-[56px] w-full max-w-[640px] items-center justify-between p-[16px]">
      {left}
      {center}
      {right}
    </nav>
  );
};

export default Header;
