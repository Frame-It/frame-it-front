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
    <nav className="fixed top-0 z-30 mx-auto flex h-[56px] w-full max-w-[640px] items-center justify-between border-b-[1px] border-b-[#ECE9E7] bg-white p-[16px]">
      {left}
      {center}
      {right}
    </nav>
  );
};

export default Header;
