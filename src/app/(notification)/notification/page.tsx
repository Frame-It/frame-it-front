import { fakerKO as faker } from '@faker-js/faker';
import NotificationList from '@/components/notification/notification-list';

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
    <main className="h-[calc(100dvh-58px-64px)] overflow-y-auto">
      <NotificationList notificationList={notificationList} />
    </main>
  );
}
