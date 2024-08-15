import { faker } from '@faker-js/faker';

export const generateRandomImage = () => {
  return faker.image.urlPicsumPhotos();
};
