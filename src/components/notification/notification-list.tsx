'use client';

import { cn } from '@/lib/utils';
import Icon from '@/components/common/icon';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import AlertDialog from '../common/alert-dialog';
import useDisclosure from '@/hooks/useDisclosure';
import { INotification } from '@/types/notification';
import { useState } from 'react';
import { deleteNotification } from '@/service/client-actions/notification';

interface INotificationListProps {
  notificationList: INotification[];
}

const NotificationList: React.FunctionComponent<INotificationListProps> = ({
  notificationList,
}) => {
  const router = useRouter();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [selectedNotificationId, setSelectedNotificationId] = useState<
    number | null
  >(null);

  const handleDelete = async (id: number) => {
    await deleteNotification(id);
  };

  return (
    <>
      <ul className="flex w-full flex-col gap-y-4 px-4 py-2">
        {notificationList.map((noti) => {
          let newLink = '';

          if (noti.eventType !== 'SIGN_UP') {
            newLink = `/project-management/${noti.resourcesId}?status=${returnEmptyIfNull(noti.projectStatus)}&isHost=${returnEmptyIfNull(noti.isHost)}`;
          } else {
            newLink = '/my-page/my-studio';
          }

          return (
            <li
              className={cn(
                `rounded-[8px] border border-gray-80 bg-gray-95 p-[12px]`,
                noti.isRead && 'bg-white',
              )}
              key={noti.id}
              onClick={() => router.push(newLink || '/')}
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
                  <div className="ml-[16px] mr-[12px] flex flex-grow flex-col gap-y-[2px]">
                    <div className="font-body-16 text-gray-10">
                      {noti.title}
                    </div>
                    <time className="font-tag-12 text-gray-10">
                      {format(noti.sendTime, 'yyyy.MM.dd')}
                    </time>
                  </div>
                  <div></div>
                  <button
                    className="self-start text-xs leading-[150%]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNotificationId(noti.id);
                      onOpen();
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <p className="font-caption-12 mt-[8px] w-full">{noti.content}</p>
            </li>
          );
        })}
      </ul>

      <AlertDialog
        title="해당 알림을 삭제하시겠습니까?"
        cancleTitle="취소"
        confirmTitle="삭제"
        open={isOpen}
        onConfirm={async () => {
          if (selectedNotificationId) {
            await handleDelete(selectedNotificationId);
            router.refresh();
            onClose();
          }
        }}
        onCancle={() => onClose()}
        onOpenChange={() => onClose()}
      />
    </>
  );
};

export default NotificationList;

function returnEmptyIfNull(value: string | null | boolean) {
  return value === null || value === 'null' ? '' : value;
}
