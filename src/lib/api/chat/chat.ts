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
    console.log(data);

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
    console.log(res);
    console.log(data);
  }

  return data;
};
