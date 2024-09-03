import { TLetter } from '@/types/letter';
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

export const talkList: TLetter = {
  conversation_id: 'conv_56789',
  participants: [
    {
      user_id: 'user_1',
      username: 'Alice',
      role: 'model',
      imageUrl: faker.image.avatarGitHub(),
    },
    {
      user_id: 'user_2',
      username: 'Bob',
      role: 'author',
      imageUrl: faker.image.avatarGitHub(),
    },
  ],
  messages: [
    {
      message_id: '1',
      sender_id: 'user_1',
      receiver_id: 'user_2',
      content: '안녕, 잘 지냈어?',
      timestamp: '2024-08-25T09:00:00Z',
      status: 'delivered',
    },
    {
      message_id: '123123',
      sender_id: 'user_1',
      receiver_id: 'user_2',
      content: '왜 답장 안해! ㅡㅡ',
      timestamp: '2024-08-25T09:00:00Z',
      status: 'delivered',
    },
    {
      message_id: '2',
      sender_id: 'user_2',
      receiver_id: 'user_1',
      content: '미안 잘 지냈어?',
      timestamp: '2024-08-25T09:05:00Z',
      status: 'delivered',
    },
    {
      message_id: '12312323',
      sender_id: 'user_2',
      receiver_id: 'user_1',
      content: '너는 왜 답장 안해 ㅡㅡ',
      timestamp: '2024-08-25T09:05:00Z',
      status: 'delivered',
    },
    {
      message_id: '3',
      sender_id: 'user_1',
      receiver_id: 'user_2',
      content: '나도 잘 지냈어.',
      timestamp: '2024-08-25T09:10:00Z',
      status: 'delivered',
    },
    {
      message_id: '4',
      sender_id: 'user_2',
      receiver_id: 'user_1',
      content: '오늘 뭐해?',
      timestamp: '2024-08-26T10:00:00Z',
      status: 'delivered',
    },
    {
      message_id: '5',
      sender_id: 'user_1',
      receiver_id: 'user_2',
      content: '별일 없어. 그냥 쉬고 있어.',
      timestamp: '2024-08-26T10:15:00Z',
      status: 'delivered',
    },
    {
      message_id: '6',
      sender_id: 'user_2',
      receiver_id: 'user_1',
      content: '같이 영화 볼래?',
      timestamp: '2024-08-27T11:00:00Z',
      status: 'delivered',
    },
    {
      message_id: '7',
      sender_id: 'user_1',
      receiver_id: 'user_2',
      content: '좋아! 어디서 볼까?',
      timestamp: '2024-08-27T11:05:00Z',
      status: 'delivered',
    },
    {
      message_id: '8',
      sender_id: 'user_2',
      receiver_id: 'user_1',
      content: '우리 집에서 볼래?',
      timestamp: '2024-08-27T11:10:00Z',
      status: 'delivered',
    },
    {
      message_id: '9',
      sender_id: 'user_1',
      receiver_id: 'user_2',
      content: '그래! 시간 맞춰 갈게.',
      timestamp: '2024-08-28T12:00:00Z',
      status: 'delivered',
    },
    {
      message_id: '10',
      sender_id: 'user_2',
      receiver_id: 'user_1',
      content:
        '알았어. 기다릴게! 아주아주 긴 메세지 아주아주 긴 메세지 아주아주 긴 메세지 아주아주 긴 메세지',
      timestamp: '2024-08-28T12:05:00Z',
      status: 'delivered',
    },
  ],
};
