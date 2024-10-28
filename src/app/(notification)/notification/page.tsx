import NotificationList from '@/components/notification/notification-list';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getNotification } from '@/service/server-actions/notification';

export default async function NotificationPage() {
  const notiArr = await getNotification();

  return (
    <ScrollArea className="h-[calc(100dvh-58px)] py-[20px] xl:h-[calc(100%-58px)]">
      <NotificationList notificationList={notiArr} />
    </ScrollArea>
  );
}
