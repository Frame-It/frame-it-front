import { z } from 'zod';

export const profileSchema = z.object({
  introduce: z.string().optional(),
  concepts: z.array(z.string()).refine((value) => value.some((item) => item)),
  profileImage: z.instanceof(File).optional(),
});

export type ProfileFormType = z.infer<typeof profileSchema>;

export const nicknameSchema = z.object({
  nickname: z
    .string({
      required_error: '닉네임을 입력해 주세요.',
    })
    .min(2, {
      message: '2~8 글자 이내로 입력해 주세요',
    })
    .max(8, {
      message: '2~8 글자 이내로 입력해 주세요',
    })
    .regex(/^[가-힣a-zA-Z]+$/, {
      message: '한글 or 영어만 가능합니다. ',
    }),
});

export type NickNameFormType = z.infer<typeof nicknameSchema>;
