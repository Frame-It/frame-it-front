import { faker } from '@faker-js/faker/locale/af_ZA';
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
        title: faker.commerce.product(),
        message: faker.lorem.sentences(),
        isRead: false,
      };
    },
  );

  return (
    <main>
      <NotificationList notificationList={notificationList} />
    </main>
  );
}
