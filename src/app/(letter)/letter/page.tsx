import Link from 'next/link';
import Image from 'next/image';
import { faker } from '@faker-js/faker';
import RoleBadge from '@/components/common/role-badge';

export default function LetterPage() {
  const lettarArr = Array.from({ length: 20 }, () => {
    return {
      id: faker.string.uuid(),
      messages: [
        {
          sender: '닉네임 원',
          profileUrl: faker.image.avatarGitHub(),
          role: 'model',
          value: '안녕하세요',
        },
        {
          sender: '닉네임 투',
          profileUrl: faker.image.avatarGitHub(),
          role: 'author',
          value: '쪽지 테스트 입니다.',
        },
        {
          sender: '닉네임 투',
          profileUrl: faker.image.avatarGitHub(),
          role: 'author',
          value: '안녕히 계세요',
        },
        {
          sender: '닉네임 원',
          profileUrl: faker.image.avatarGitHub(),
          role: 'model',
          value: '잘자요',
        },
        {
          sender: '닉네임 원',
          profileUrl: faker.image.avatarGitHub(),
          role: 'model',
          value: '굿 나잇',
        },
      ],
    };
  });
  return (
    <main className="h-[calc(100dvh-58px-63px)] overflow-y-auto px-4">
      <ul className="my-6 flex flex-col gap-y-6">
        {lettarArr.map((letter) => {
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
                      <RoleBadge
                        role={
                          (lastMessage?.role as 'author' | 'model') || 'author'
                        }
                      />
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
