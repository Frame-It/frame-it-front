import Image from 'next/image';
import { letterList } from '@/constants/data';
import RoleBadge from '@/components/common/role-badge';
import Link from 'next/link';

export default function LetterPage() {
  return (
    <main className="px-4">
      <ul className="mt-6 flex flex-col gap-y-6">
        {letterList.map((letter) => {
          const lastMessage = letter.messages.at(-1);

          return (
            <Link href={`/letter-detail/${letter.id}`} key={letter.id}>
              <li className="flex items-center justify-between" key={letter.id}>
                <Image
                  alt="profile"
                  src={lastMessage?.profileUrl || ''}
                  width={46}
                  height={46}
                  priority
                  sizes="46px"
                  className="rounded-[8px]"
                />
                <div className="ml-2 flex-1 space-y-[4px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-[9px]">
                      <RoleBadge role={lastMessage?.role || 'author'} />
                      <div>{lastMessage?.sender}</div>
                    </div>

                    <time>방금</time>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] leading-[150%]">
                      {lastMessage?.value}
                    </p>
                    <div className="flex size-5 items-center justify-center rounded-full bg-primary text-[12px] text-white">
                      3
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
}
