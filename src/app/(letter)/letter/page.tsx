import Link from 'next/link';
import RoleBadge from '@/components/common/role-badge';
import { getUserChat } from '@/service/server-actions/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IChat } from '@/types/letter';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export default async function LetterPage() {
  const chatList: IChat[] = (await getUserChat()) || [];

  const lastMessageTime = new Date('2024-10-16T18:26:50.099667');
  const timeAgo = formatDistanceToNow(lastMessageTime, {
    addSuffix: true,
    locale: ko,
  });

  console.log(chatList);

  return (
    <main className="h-[calc(100dvh-58px-63px)] overflow-y-auto px-4">
      <ul className="my-6 flex flex-col gap-y-6">
        {chatList?.map((chat) => {
          return (
            <Link href={`/letter-detail/${chat.chatId}`} key={chat.chatId}>
              <li className="flex items-center justify-between">
                <Avatar className="aspect-square size-[46px] cursor-pointer rounded-[8px]">
                  <AvatarImage src={chat.participants.profileImageUrl} />
                  <AvatarFallback className="aspect-square size-[100px] cursor-pointer rounded-[16px]">
                    Fr
                  </AvatarFallback>
                </Avatar>
                <div className="ml-2 flex-1 space-y-[4px]">
                  <div className="flex items-center justify-between py-[2.5px]">
                    <div className="flex items-center gap-x-[4px]">
                      <RoleBadge
                        role={chat.participants.identity as 'author' | 'model'}
                      />
                      <div className="font-body-14m">
                        {chat.participants.name}
                      </div>
                    </div>

                    <time className="font-tag-12 text-gray-20">{timeAgo}</time>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs leading-[150%]">{chat.lastMessage}</p>
                    <div className="flex size-5 items-center justify-center rounded-full bg-primary text-[12px] text-white">
                      {chat.unreadMessageCount}
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
