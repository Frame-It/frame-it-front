import { IChat, IChatDetail, IMessage } from '@/types/letter';
import { getAuthHeader } from '../header';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getChatByParticipantId = async (participantId: number) => {
  const headers = await getAuthHeader();

  const res: Response = await fetch(`${API_URL}/chats/users/${participantId}`, {
    headers,
    cache: 'no-store',
  });

  const data = await res.text();
  if (!res.ok) {
    throw new Error('Failed to fetch in-progress project');
  }

  return data;
};

export const postCreateChat = async (participantId: number) => {
  const headers = await getAuthHeader();

  const res = await fetch(`${API_URL}/chats`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      participantId,
    }),
  });
  const data = res.text();

  if (!res.ok) {
    // console.log(res);
    // console.log(data);
  }

  return data;
};

export const getChatMessage = async (id: string) => {
  const headers = await getAuthHeader();

  if (id) {
    const res = await fetch(`${API_URL}/chats/${id}`, {
      method: 'GET',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Something Error!');
    }

    const data: IChatDetail = await res.json();

    return data;
  }
};

export const postChatMessage = async ({
  chatId,
  userId,
  message,
}: {
  chatId: string;
  message: string;
  userId?: number;
}) => {
  const headers = await getAuthHeader();

  if (userId) {
    const res = await fetch(`${API_URL}/chats/${chatId}/messages`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        receiverId: +userId,
        content: message,
      }),
    });

    if (!res.ok) {
      throw new Error('Something Error!');
    }
  }
};
