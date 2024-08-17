import { faker } from '@faker-js/faker';

export const generateRandomImage = () => {
  return {
    imageUrl: faker.image.urlPicsumPhotos(),
    height: [183, 411],
  };
};
