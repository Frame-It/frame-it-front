'use client';

import { cn } from '@/lib/utils';
import Icon from '@/components/common/icon';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import AlertDialog from '../common/alert-dialog';
import useDisclosure from '@/hooks/useDisclosure';

interface INotificationListProps {
  notificationList: {
    id: string;
    path: string;
    title: string;
    date: Date;
    message: string;
    isRead?: boolean;
  }[];
}

const NotificationList: React.FunctionComponent<INotificationListProps> = ({
  notificationList,
}) => {
  const router = useRouter();
  const { open, close, isOpen } = useDisclosure();

  return (
    <>
      <ul className="my-[20px] flex flex-col gap-y-4">
        {notificationList.map((noti) => (
          <li
            className={cn(
              `rounded-[8px] border border-gray-80 bg-gray-95 p-[12px]`,
              noti.isRead && 'bg-white',
            )}
            onClick={() => router.push(noti.path)}
            key={noti.id}
          >
            <div className="">
              <div className="flex w-full items-center">
                <span
                  className={cn(
                    'inline-flex items-center justify-center rounded-full bg-primary/20 p-[6px]',
                    noti.isRead && 'bg-gray-80',
                  )}
                >
                  <Icon
                    id="notification-icon"
                    className={cn(
                      'h-8 w-8 text-primary',
                      noti.isRead && 'text-gray-40',
                    )}
                  />
                </span>
                <div className="ml-[16px] mr-[12px] flex-grow">
                  <div className="text-sm font-medium leading-[150%] text-gray-10">
                    {noti.title}
                  </div>
                  <time className="text-xs text-gray-10">
                    {format(noti.date, 'yyyy.MM.dd')}
                  </time>
                </div>
                <div></div>
                <button
                  className="self-start text-xs leading-[150%]"
                  onClick={(e) => {
                    e.stopPropagation();
                    open();
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs leading-[150%]">
              {noti.message}
            </p>
          </li>
        ))}
      </ul>

      <AlertDialog
        title="해당 알림을 삭제하시겠습니까?"
        cancleTitle="취소"
        confirmTitle="삭제"
        open={isOpen}
        onConfirm={() => {
          close();
        }}
        onCancle={() => close()}
        onOpenChange={() => close()}
      />
    </>
  );
};

export default NotificationList;
