'use client';

import { getChatMessage } from '@/lib/api/chat/chat';
import { cn } from '@/lib/utils';
import { IChatDetail, IMessage } from '@/types/letter';
import { useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';

import { ko } from 'date-fns/locale/ko';

import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useRef } from 'react';

const REFETCH_INTERVAL = 5000;

const LetterList = ({ myId, myImage }: { myId?: number; myImage: string }) => {
  const id = usePathname().split('/').at(-1);

  const { data: chats } = useQuery({
    queryKey: ['getChatMessages', id],
    queryFn: ({ queryKey }) => getChatMessage(queryKey[1] || ''),
    enabled: !!id,
    staleTime: 0,
    gcTime: 0,
    refetchInterval: REFETCH_INTERVAL,
    refetchIntervalInBackground: true,
  });

  const groupedMessages: any = calGroupMessage(chats);

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  return (
    <div className="mx-auto mt-4 w-full">
      <div className="space-y-[20px]">
        {Object.keys(groupedMessages).map((date) => (
          <div key={date}>
            <div className="relative mb-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {format(new Date(date), 'yyyy년 M월 d일 (EEE)', {
                    locale: ko,
                  })}
                </span>
              </div>
            </div>

            {groupedMessages[date].map((message: IMessage) => {
              const isMe = message.isMe;

              return (
                <div
                  key={message.messageId}
                  className={cn(
                    `flex items-start justify-start`,
                    isMe ? 'mt-[12px]' : 'mt-[6px]',
                  )}
                >
                  {isMe ? (
                    <Avatar className="mr-2 aspect-square size-[30px] rounded-[6px]">
                      <AvatarImage src={myImage || ''} />
                      <AvatarFallback className="aspect-square size-[30px] cursor-pointer rounded-[6px]">
                        나
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="mr-2 aspect-square size-[30px] rounded-[6px]">
                      <AvatarImage src={message.sender.profileImageUrl || ''} />
                      <AvatarFallback className="aspect-square size-[30px] cursor-pointer rounded-[6px]">
                        You
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[236px] rounded-[8px] ${isMe ? 'border border-gray-60 bg-white' : 'bg-gray-90'} rounded-lg p-2`}
                  >
                    <div className="text-sm text-gray-800">
                      {message.content}
                    </div>
                  </div>
                  <div className="ml-[6px] self-end text-xs text-gray-60">
                    {format(new Date(message.timeStamp + 'Z'), 'HH:mm', {
                      locale: ko,
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default LetterList;

function calGroupMessage(chatData?: IChatDetail) {
  const groupedMessages = chatData?.messages.reduce(
    (acc, message) => {
      const date = new Date(message.timeStamp);

      const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
      const formattedDate = format(kstDate, 'yyyy-MM-dd');

      const dateKey = `${formattedDate}`;

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(message);
      return acc;
    },
    {} as Record<string, IMessage[]>,
  );

  // 날짜별로 오름차순 정렬
  if (groupedMessages) {
    const sortedKeys = Object.keys(groupedMessages).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );
    const sortedGroupedMessages: Record<string, IMessage[]> = {};
    sortedKeys.forEach((key: string) => {
      sortedGroupedMessages[key] = groupedMessages[key].sort(
        (a, b) =>
          new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime(),
      );
    });
    return sortedGroupedMessages;
  }

  return groupedMessages || [];
}
