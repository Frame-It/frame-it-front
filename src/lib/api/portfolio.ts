const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getFeeds = async () => {
  return await fetch(`https://api.frameit.kr/portfolio`, {
    method: 'GET',
  }).then((res) => console.log(res));
};
