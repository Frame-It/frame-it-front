import { toast } from '@/components/ui/use-toast';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyByO3Vy6DUeO5MU1iN16INN1COpdbyoa7w',
  authDomain: 'framit-8771a.firebaseapp.com',
  projectId: 'framit-8771a',
  storageBucket: 'framit-8771a.appspot.com',
  messagingSenderId: '378627404999',
  appId: '1:378627404999:web:315822db2080bc19493ae2',
  measurementId: 'G-92V0DP3DVN',
};

const app = initializeApp(firebaseConfig);

/**
 * FCM 토큰 발급
 */
export const sendTokenHandler = async () => {
  const messaging = getMessaging(app);
  let returnToken;

  await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_MESSAGE_VAPID_KEY,
  })
    .then(async (currentToken) => {
      if (!currentToken) {
        // 토큰 생성 불가시 처리할 내용, 주로 브라우저 푸시 허용이 안된 경우에 해당한다.
        toast({
          title: '알림 설정을 해주세요!',
          duration: 1300,
        });
        return null;
      } else {
        // 토큰을 받았다면 여기서 DB에 저장하면 됩니다.
        returnToken = currentToken;
      }
    })
    .catch(() => {
      toast({
        title: '알림 설정을 해주세요!',
        duration: 1300,
      });
      return null;
    });

  return returnToken;
};

export const clickPushHandler = () => {
  Notification.requestPermission().then((permission) => {
    if (permission !== 'granted') {
      // 푸시 거부됐을 때 처리할 내용
    } else {
      // 푸시 승인됐을 때 처리할 내용
    }
  });
};
