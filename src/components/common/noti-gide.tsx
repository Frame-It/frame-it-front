'use client';

import { XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const isSupported = () =>
  'Notification' in window &&
  'serviceWorker' in navigator &&
  'PushManager' in window;

const NotificationGuide = () => {
  const [isNotificationAllowed, setIsNotificationAllowed] = useState<
    boolean | null
  >(null);
  const [isGuideVisible, setIsGuideVisible] = useState(true);

  // 알림 권한 상태를 확인하는 함수
  const checkNotificationPermission = () => {
    if (Notification.permission === 'granted') {
      setIsNotificationAllowed(true);
    } else if (
      Notification.permission === 'denied' ||
      Notification.permission === 'default'
    ) {
      setIsNotificationAllowed(false);
    }
  };

  // 알림 권한 요청 함수
  const requestNotificationPermission = async () => {
    if (isSupported()) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setIsNotificationAllowed(true);
      } else {
        setIsNotificationAllowed(false);
      }
    }
  };

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  if (isNotificationAllowed || !isGuideVisible) {
    // 가이드 표시 상태 확인
    return null;
  }

  return (
    <div className="fixed bottom-[64px] flex max-w-[360px] items-center justify-center bg-gray-50 shadow-md xl:absolute">
      <div className="rounded-lg border border-primary bg-white px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            잠깐! 아직 알림을 허용 안하셨나요?
          </h2>
          <button onClick={() => setIsGuideVisible(false)}>
            <XIcon />
          </button>
        </div>
        <div className="mt-2">
          <p className="font-body-14">
            Frameit의 새로운 알림을 받으시려면, 브라우저 설정에서 알림을
            허용해주세요!
          </p>
        </div>
        <div className="flex w-full items-center justify-end gap-x-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsGuideVisible(false)}
            className="rounded-full px-4"
          >
            닫기
          </Button>
          <Button
            size="sm"
            onClick={requestNotificationPermission}
            className="rounded-full px-4"
          >
            허용
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationGuide;
