import { faker } from '@faker-js/faker';

export const generateRandomImageList = () => {
  const width = Math.floor(Math.random() * (800 - 350 + 1)) + 550;
  const height = Math.floor(Math.random() * (900 - 200 + 1)) + 200;

  const roles = ['model', 'author'];

  return {
    url: faker.image.urlPicsumPhotos({
      width,
      height,
    }),
    role: roles[Math.floor(Math.random() * roles.length)] as 'author' | 'model',
    isPremium: Math.random() < 0.5,
    height,
  };
};
