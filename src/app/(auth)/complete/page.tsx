import { Button } from '@/components/ui/button';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function CompletePage({
  searchParams,
}: {
  searchParams: { role: string; nickname: string };
}) {
  const cookieStore = cookies();
  cookieStore.set('identify', searchParams.role);
  cookieStore.set('nickname', searchParams.nickname);

  return (
    <main
      className="h-dvh bg-cover text-white"
      style={{
        backgroundImage: `url("${generateRoleRandomImagePath(searchParams.role)}")`,
      }}
    >
      <div className="flex h-full w-full flex-col justify-between bg-black bg-opacity-60 px-8 pb-[50px] pt-[100px]">
        <div className="">
          <div className="font-heading-24 max-w-[227px]">
            환영해요{' '}
            <strong className="text-primary">{searchParams.nickname}</strong>님!
            가입이 완료되었어요.
          </div>
          <div className="mt-6">프레이밋에서 작가로 성장해보세요.</div>
        </div>
        <Link href="/" replace>
          <Button size="lg" className="w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <rect width="18" height="18" fill="#E45E25" />
              <path
                d="M8.82878 8.62043C8.76943 8.62043 8.71959 8.66781 8.71389 8.73045L8.68307 10.6962C8.59443 12.6813 8.38748 13.7148 8.19155 14.3941C7.91879 15.3401 7.53721 15.9986 6.86803 16.8281C6.46288 17.3304 5.91886 17.719 5.30903 17.8772C4.29214 18.1414 2.99753 17.9696 2.08107 17.4548C2.00194 17.4103 1.96922 17.3107 2.0358 17.2469L2.90052 16.1568C2.93095 16.1274 2.97394 16.1182 3.01313 16.1315C3.47079 16.2844 3.89953 16.4683 4.38839 16.4169C5.34745 16.3162 6.06913 15.5304 6.57891 14.727C6.82162 14.3443 7.032 13.9312 7.17923 13.4972C7.39075 12.874 7.44211 12.1637 7.48395 11.5081C7.49537 11.3326 7.50221 11.1572 7.51325 10.9817L7.56004 8.75414C7.56689 8.68227 7.51325 8.62003 7.44515 8.62003L4.94838 8.58992C4.84604 8.58992 4.79392 8.45983 4.86583 8.38234L5.42164 7.34484C5.44332 7.32155 5.47299 7.3083 5.50419 7.3083L7.56993 7.33842C7.62928 7.33842 7.67911 7.29104 7.68482 7.2284L7.72134 6.84336C7.91536 4.73824 8.30644 2.89411 9.26133 1.7189C9.65926 1.22946 10.1272 0.797034 10.6693 0.493895C11.2403 0.174695 11.8536 0.040993 12.4946 0.0104783C13.3106 -0.0288696 14.2164 0.020516 14.9001 0.548902C14.9819 0.61234 15.0382 0.685816 14.9686 0.757686L14.0574 1.69922C14.0258 1.73215 13.9791 1.74178 13.9372 1.72572C13.6424 1.6121 13.3658 1.47558 13.0569 1.40452C12.3915 1.25154 11.6352 1.17164 10.9771 1.40371C10.4239 1.59885 9.96246 2.01802 9.65697 2.53798C9.50404 2.79856 9.38915 3.08363 9.31611 3.37994C9.09926 4.25924 9.03079 5.18071 8.94709 6.0821L8.83943 7.20431C8.83258 7.27618 8.88584 7.33842 8.95432 7.33842H11.308C11.4119 7.33842 11.4785 7.44562 11.4043 7.52231L10.8991 8.56944C10.8774 8.59153 10.8352 8.61963 10.8051 8.61963H8.82802L8.82878 8.62043Z"
                fill="white"
              />
            </svg>
            프레이밋 시작하기
          </Button>
        </Link>
      </div>
    </main>
  );
}

function generateRoleRandomImagePath(role: string) {
  const randomNum = Math.floor(Math.random() * 4) + 1;

  if (role === 'MODEL') {
    return `/png/model_image0${randomNum}.png`;
  }

  return `/png/photo_image0${randomNum}.png`;
}
