import { faker } from '@faker-js/faker';

interface ItempLetter {
  id: string;
  messages: {
    sender: string;
    profileUrl: string;
    role: 'model' | 'author';
    value: string;
  }[];
}

export const letterList: ItempLetter[] = [
  {
    id: faker.string.uuid(),
    messages: [
      {
        sender: '닉네임 원',
        profileUrl: faker.image.avatarGitHub(),
        role: 'model',
        value: '안녕하세요',
      },
      {
        sender: '닉네임 투',
        profileUrl: faker.image.avatarGitHub(),
        role: 'author',
        value: '쪽지 테스트 입니다.',
      },
      {
        sender: '닉네임 투',
        profileUrl: faker.image.avatarGitHub(),
        role: 'author',
        value: '안녕히 계세요',
      },
      {
        sender: '닉네임 원',
        profileUrl: faker.image.avatarGitHub(),
        role: 'model',
        value: '잘자요',
      },
      {
        sender: '닉네임 원',
        profileUrl: faker.image.avatarGitHub(),
        role: 'model',
        value: '굿 나잇',
      },
    ],
  },
  {
    id: faker.string.uuid(),
    messages: [
      {
        sender: '닉네임 원',
        profileUrl: faker.image.avatarGitHub(),
        role: 'model',
        value: '안녕하세요',
      },
      {
        sender: '닉네임 투',
        profileUrl: faker.image.avatarGitHub(),
        role: 'author',
        value: '쪽지 테스트 입니다.',
      },
      {
        sender: '닉네임 투',
        profileUrl: faker.image.avatarGitHub(),
        role: 'author',
        value: '안녕히 계세요',
      },
      {
        sender: '닉네임 원',
        profileUrl: faker.image.avatarGitHub(),
        role: 'model',
        value: '잘자요',
      },
      {
        sender: '닉네임 원',
        profileUrl: faker.image.avatarGitHub(),
        role: 'model',
        value: '굿 나잇',
      },
    ],
  },
  {
    id: faker.string.uuid(),
    messages: [
      {
        sender: '닉네임 원',
        profileUrl: faker.image.avatarGitHub(),
        role: 'model',
        value: '안녕하세요',
      },
      {
        sender: '닉네임 투',
        profileUrl: faker.image.avatarGitHub(),
        role: 'author',
        value: '쪽지 테스트 입니다.',
      },
      {
        sender: '닉네임 투',
        profileUrl: faker.image.avatarGitHub(),
        role: 'author',
        value: '안녕히 계세요',
      },
      {
        sender: '닉네임 원',
        profileUrl: faker.image.avatarGitHub(),
        role: 'model',
        value: '잘자요',
      },
      {
        sender: '닉네임 원',
        profileUrl: faker.image.avatarGitHub(),
        role: 'model',
        value: '굿 나잇',
      },
    ],
  },
  {
    id: faker.string.uuid(),
    messages: [
      {
        sender: '닉네임 원',
        profileUrl: faker.image.avatarGitHub(),
        role: 'model',
        value: '안녕하세요',
      },
      {
        sender: '닉네임 투',
        profileUrl: faker.image.avatarGitHub(),
        role: 'author',
        value: '쪽지 테스트 입니다.',
      },
      {
        sender: '닉네임 투',
        profileUrl: faker.image.avatarGitHub(),
        role: 'author',
        value: '안녕히 계세요',
      },
      {
        sender: '닉네임 원',
        profileUrl: faker.image.avatarGitHub(),
        role: 'model',
        value: '잘자요',
      },
      {
        sender: '닉네임 원',
        profileUrl: faker.image.avatarGitHub(),
        role: 'model',
        value: '굿 나잇',
      },
    ],
  },
  {
    id: faker.string.uuid(),
    messages: [
      {
        sender: '닉네임 원',
        profileUrl: faker.image.avatarGitHub(),
        role: 'model',
        value: '안녕하세요',
      },
      {
        sender: '닉네임 투',
        profileUrl: faker.image.avatarGitHub(),
        role: 'author',
        value: '쪽지 테스트 입니다.',
      },
      {
        sender: '닉네임 투',
        profileUrl: faker.image.avatarGitHub(),
        role: 'author',
        value: '안녕히 계세요',
      },
      {
        sender: '닉네임 원',
        profileUrl: faker.image.avatarGitHub(),
        role: 'model',
        value: '잘자요',
      },
      {
        sender: '닉네임 원',
        profileUrl: faker.image.avatarGitHub(),
        role: 'model',
        value: '굿 나잇',
      },
      {
        sender: '닉네임 원',
        profileUrl: faker.image.avatarGitHub(),
        role: 'author',
        value: '굿 나잇ㅋㅋㅋ',
      },
    ],
  },
];
