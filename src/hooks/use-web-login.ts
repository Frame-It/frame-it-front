import { toast } from '@/components/ui/use-toast';
import { isNativeApp } from '@/lib/platform';
import { sendCodeToBackend } from '@/service/auth-service';
import { tokenRenewal } from '@/service/client-actions/notification';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

const useWebLogin = ({ code, state }: { code: string; state: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isNativeApp()) return;

    const authenticate = async () => {
      if (code && state) {
        setLoading(true);
        try {
          const data = await sendCodeToBackend(code, state);
          if (data === undefined) {
            toast({
              title: '서버에서 오류가 발생하였습니다.',
              variant: 'destructive',
            });
          }

          if (!data?.signUpCompleted) {
            router.push(`/register`);
            setCookie('oauthId', data.oauthUserId);
          } else {
            setCookie('identity', data.identity);
            setCookie('accessToken', data.accessToken);
            if (data.notificationsEnabled === true) {
              await tokenRenewal(data.id);
            }
            router.push('/');
          }
        } catch (error) {
          console.error('Error during authentication:', error);
          // 오류 시 에러 페이지로 이동하거나 에러 처리 가능
        } finally {
          setLoading(false);
        }
      }
    };

    authenticate();
  }, [code, router, state]);
  return { loading };
};

export default useWebLogin;
