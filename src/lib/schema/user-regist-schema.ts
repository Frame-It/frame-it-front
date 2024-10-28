import { z } from 'zod';

// const parseDate = (dateString: string, formatString: string) => {
//   const parsedDate = parse(dateString, formatString, new Date());
//   return isValid(parsedDate) ? parsedDate : undefined;
// };

export const stepThreeSchema = z.object({
  name: z
    .string()
    .min(2, '2자 이상 입력해 주세요.')
    .max(30, '최대 30자 까지 가능해요.')
    .regex(/^[가-힣]+$/, '한글만 가능해요.'),
});

export const stepFourSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 최소 2글자 이상이어야 합니다.')
    .max(8, '닉네임은 최대 8글자까지 가능합니다.')
    .regex(
      /^[가-힣a-zA-Z]+$/,
      '이름은 한글 또는 영문만 포함할 수 있으며, 띄어쓰기는 불가능합니다.',
    ),
});
