import { fakerKO as faker } from '@faker-js/faker';
import NotificationList from '@/components/notification/notification-list';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function NotificationPage() {
  // 알림 url 받아오기

  const notificationList: {
    id: string;
    path: string;
    title: string;
    date: Date;
    message: string;
    isRead?: boolean;
  }[] = Array.from(
    {
      length: 10,
    },
    () => {
      return {
        id: faker.string.uuid(),
        path: '/my-page/my-studio',
        date: faker.date.anytime(),
        title: '한글',
        message: faker.lorem.sentences(),
        isRead: false,
      };
    },
  );

  return (
    <ScrollArea className="h-[calc(100dvh-58px)] py-[20px] xl:h-[calc(100%-58px)]">
      <NotificationList notificationList={notificationList} />
    </ScrollArea>
  );
}
