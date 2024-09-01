interface IMyPageMenuProps {}

// const paths = [
//   {
//     label: '',
//     path: '',
//   },
// ];

const MyPageMenu: React.FunctionComponent<IMyPageMenuProps> = () => {
  return (
    <nav>
      <div className="text-lg font-semibold leading-[135%]">나의 활동</div>
    </nav>
  );
};

export default MyPageMenu;
