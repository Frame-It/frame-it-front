'use client';

import { setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function RefreshPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const redirectUrl = searchParams.get('redirectUrl') || '/';
  const hasSentExpiredMessage = useRef(false);

  useEffect(() => {
    if (loading || hasSentExpiredMessage.current) return;
    if (window.ReactNativeWebView) {
      setLoading(true);
      hasSentExpiredMessage.current = true;
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: 'ACCESS_TOKEN_EXPIRED',
        }),
      );
    } else {
      router.push('/login');
    }
  }, [router, loading]);

  useEffect(() => {
    if (!window.ReactNativeWebView || !loading) return;

    window.refreshAccessToken = async (accessToken: string) => {
      try {
        setCookie('accessToken', accessToken);
        // alert(`accessToken: ${accessToken}`);
        router.push(redirectUrl || '/');
      } catch (error) {
        console.error(error);
        alert('accessToken 갱신 실패');
      } finally {
        setLoading(false);
      }
    };

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'READY',
      }),
    );
  }, [redirectUrl, router, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return null;
}
