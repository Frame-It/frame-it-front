import { toast } from '@/components/ui/use-toast';
import { isNativeApp } from '@/lib/platform';
import { tokenRenewal } from '@/service/client-actions/notification';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useNativeLogin = ({ code, state }: { code: string; state: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isNativeApp()) return;
    window.receiveAuthData = async (authData: any) => {
      try {
        if (authData === undefined) {
          toast({
            title: '서버에서 오류가 발생하였습니다.',
            variant: 'destructive',
          });
        }
        if (authData.notificationsEnabled === true) {
          await tokenRenewal(authData.id);
        }
        if (!authData.identity || !authData.accessToken)
          throw Error('토큰 오류');

        if (!authData?.signUpCompleted) {
          router.push(`/register`);

          setCookie('oauthId', authData.oauthUserId);
        } else {
          setCookie('identity', authData.identity);
          setCookie('accessToken', authData.accessToken);
          if (authData.notificationsEnabled === true) {
            await tokenRenewal(authData.id);
          }

          router.push('/');
        }
      } catch (error) {
        console.error('메시지 처리 중 에러:', error);
        toast({
          title: '서버에서 오류가 발생하였습니다.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'READY',
      }),
    );
  }, [router]);

  useEffect(() => {
    if (loading) return;
    if (!isNativeApp()) return;

    const authenticate = async () => {
      if (code && state) {
        setLoading(true);
        try {
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({
                type: 'AUTH_CODE',
                payload: {
                  code,
                  state,
                },
              }),
            );
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
  }, [code, loading, router, state]);

  return {
    loading,
  };
};
export default useNativeLogin;
