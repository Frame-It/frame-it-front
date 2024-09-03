import { cn } from '@/lib/utils';
import { IMessage, TLetter } from '@/types/letter';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';

interface ILetterListProps {
  letterList: TLetter;
}

const LetterList: React.FunctionComponent<ILetterListProps> = ({
  letterList,
}) => {
  const groupMessagesByDate = (messages: IMessage[]) => {
    return messages.reduce<{ [key: string]: IMessage[] }>((groups, message) => {
      const date = format(parseISO(message.timestamp), 'yyyy-MM-dd');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(letterList.messages);
  const dates = Object.keys(groupedMessages);

  return (
    <div className="mx-auto mt-[120px] w-full">
      <div className="space-y-[20px]">
        {dates.map((date) => (
          <div key={date}>
            {/* 날짜 구분선 */}
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

            {groupedMessages[date].map((message, index) => {
              const sender = letterList.participants.find(
                (p) => p.user_id === message.sender_id,
              );
              const timestamp = format(parseISO(message.timestamp), 'p', {
                locale: ko,
              });

              const isMe = message.sender_id === 'user_1'; // 현재 사용자가 'user_1'이라고 가정

              const showProfileImage =
                index === 0 ||
                groupedMessages[date][index - 1].sender_id !==
                  message.sender_id;

              return (
                <div
                  key={message.message_id}
                  className={cn(
                    `flex items-start justify-start`,
                    showProfileImage ? 'mt-[12px]' : 'mt-[6px]',
                  )}
                >
                  {showProfileImage ? (
                    <Image
                      src={sender?.imageUrl || ''}
                      alt={`${sender?.username}의 프로필 이미지`}
                      width={30}
                      height={30}
                      priority
                      sizes="30px"
                      className="mr-2 aspect-square rounded-[6px]"
                    />
                  ) : (
                    <div className="mr-2 aspect-square size-[30px] bg-transparent" />
                  )}
                  <div
                    className={`max-w-[236px] rounded-[8px] ${isMe ? 'border border-gray-60 bg-white' : 'bg-gray-90'} rounded-lg p-2`}
                  >
                    <div className="text-sm text-gray-800">
                      {message.content}
                    </div>
                  </div>
                  <div className="ml-[6px] self-end text-xs text-gray-60">
                    {timestamp}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LetterList;
