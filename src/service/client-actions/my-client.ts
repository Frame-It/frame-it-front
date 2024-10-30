import { IMyInfo, IMyStudio } from '@/types/my';
import { getCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const deleteUser = async (reason?: string) => {
  const token = getCookie('accessToken');

  if (token) {
    const formData = new FormData();
    formData.append('quitReason', reason || '');

    const response = await fetch(`${API_URL}/users`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      body: JSON.stringify({
        quitReason: reason,
      }),
    });

    if (response.ok) {
      return true;
    }

    return false;
  }
};

export const getUserProfileClient = async () => {
  const token = getCookie('accessToken');

  if (token) {
    const response = await fetch(`${API_URL}/users/studio`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('서버에서 문제가 발생하였습니다!');
    }

    const data: IMyStudio = await response.json();
    return data;
  }
};

export const updateProfile = async (value: {
  id: number | null;
  profileImage: File | null;
  description: string | null;
  concepts: string[] | null;
  isDelete: boolean;
}) => {
  const token = getCookie('accessToken');

  if (token && value.id) {
    try {
      const formData = new FormData();

      if (value.description) {
        formData.append('description', value.description);
      }

      if (value.concepts && value.concepts.length > 0) {
        for (const concept of value.concepts) {
          formData.append('concepts', concept);
        }
      }

      if (value.profileImage) {
        formData.append('profileImage', value.profileImage);
      }

      formData.append('isDelete', value.isDelete ? 'true' : 'false');

      const res = await fetch(`${API_URL}/users/${value.id}`, {
        method: 'PATCH',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        return true;
      }
    } catch (error) {
      console.error('프로필 업데이트 중 오류 발생:', error);
      return false;
    }
  }

  return false;
};

export const updateNickname = async (value: {
  id: number | null;
  nickname: string;
}) => {
  const token = getCookie('accessToken');

  if (token && value.id) {
    try {
      const res = await fetch(`${API_URL}/users/${value.id}/nickname`, {
        method: 'PATCH',
        body: JSON.stringify({ nickname: value.nickname }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        return true;
      }
    } catch (error) {
      console.error('닉네임 업데이트 중 오류 발생:', error);
      return false;
    }
  }

  return false;
};
