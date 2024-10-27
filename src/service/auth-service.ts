// src/services/authService.ts

import { sendTokenHandler } from '@/lib/firebase';
import { IUserRegistInfo } from '@/store/user-regist-store';
import { getCookie, setCookie } from 'cookies-next';

const ADDRESS = `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

export const sendCodeToBackend = async (code: string, state: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/login/${state}?code=${code}&redirect_uri=${ADDRESS}`,
    {
      method: 'GET',
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error(`서버오류가 발생하였습니다 상태 코드 :${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const checkDuplicateId = async (nickname: string) => {
  try {
    const response = await fetch(`${SERVER_URL}/users/nicknames/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname }),
    });

    const resData = await response?.json();
    return resData.isDuplicated;
  } catch (error) {
    console.error('닉네임 중복 확인 중 오류 발생:', error);
    throw error;
  }
};

export const registUser = async (userInfo: IUserRegistInfo) => {
  if (userInfo) {
    const oauthId = getCookie('oauthId');

    let diviceToken = null;

    if (userInfo.agreeList.marketing) {
      diviceToken = await sendTokenHandler();
    }

    const response = await fetch(`${SERVER_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        identity: userInfo.role,
        name: userInfo.name,
        birthDate: userInfo.birth,
        nickname: userInfo.nickname,
        notificationsEnabled: userInfo.agreeList.marketing,
        oauthUserId: oauthId,
        deviseToken: diviceToken,
      }),
    });

    const data = await response.json();

    setCookie('accessToken', data.accessToken);
    setCookie('identity', data.identity);

    return response.ok;
  }
};
