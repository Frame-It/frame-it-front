import { getAuthHeader } from '../header';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Review {
  projectId: number;
  content: string;
  tags: string[];
  revieweeId: number;
}

export const postProjectReview = async ({
  projectId,
  content,
  tags,
  revieweeId,
}: Review) => {
  const headers = await getAuthHeader();

  const res = await fetch(`${API_URL}/projects/${projectId}/reviews`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      revieweeId: String(revieweeId),
      tags,
      content,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch completed project');
  }

  const data = res.json();
  return data;
};

export const getProjectReview = async (reviewId: number) => {
  const headers = await getAuthHeader();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/reviews/${reviewId}`,
    {
      headers,
    },
  );
  const body = await res.json();

  return body;
};
