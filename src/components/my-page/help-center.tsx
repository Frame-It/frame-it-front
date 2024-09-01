import Link from 'next/link';
import Icon from '@/components/common/icon';

interface IHelpCenterProps {}

const helpCenterLink =
  'w-full flex items-center justify-between py-[10px] pl-2 text-base font-semibold leading-[135%] text-gray-20';
const helpCenterIcon = 'text-gray-40';

const HelpCenter: React.FunctionComponent<IHelpCenterProps> = () => {
  return (
    <section>
      <div className="text-lg font-semibold leading-[135%]">고객 센터</div>
      <ul className="mt-2">
        <li>
          <Link
            href="
            https://frameit.notion.site/fb50555b39f24ac0b735e4d6e882767d"
            className={helpCenterLink}
            target="_blank"
          >
            이용 약관
            <Icon size={24} id="right-arrow-icon" className={helpCenterIcon} />
          </Link>
        </li>
        <li>
          <Link
            href="https://frameit.notion.site/9db4e942750a419c8079a79806a03113"
            className={helpCenterLink}
            target="_blank"
          >
            개인정보 처리 방침
            <Icon size={24} id="right-arrow-icon" className={helpCenterIcon} />
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default HelpCenter;
