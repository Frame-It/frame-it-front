import { z } from 'zod';

export const projectSchema = z.object({
  type: z.enum(['MODEL', 'PHOTOGRAPHER']),
  projectName: z
    .string()
    .min(1, '프로젝트명을 입력해주세요')
    .max(24, '최대 24자까지 입력 가능합니다'),
  shootingDate: z.object({
    date: z.string().min(1, '촬영 날짜를 선택해주세요'),
    period: z.enum(['MORNING', 'AFTERNOON', 'TO_BE_DISCUSSED']),
  }),
  location: z.object({
    type: z.enum(['INDOOR', 'OUTDOOR']),
    spot: z.string().nullable(),
    address: z.string().min(1, '주소를 입력해주세요'),
    detail: z.string().min(1, '상세 주소를 입력해주세요'),
  }),
  conceptTags: z
    .array(z.string())
    .min(1, '최소 1개 이상의 컨셉을 선택해주세요')
    .max(3, '최대 3개까지 선택 가능합니다')
    .refine((tags) => tags.length <= 3, '최대 3개까지 선택 가능합니다'),
  description: z
    .string()
    .min(1, '프로젝트 설명을 입력해주세요')
    .max(300, '최대 300자까지 입력 가능합니다'),
  retouchingDetails: z
    .string()
    .min(1, '보정 내용을 입력해주세요')
    .max(60, '최대 60자까지 입력 가능합니다'),
  photos: z
    .array(z.instanceof(File))
    .min(1, '최소 1개 이상의 사진을 업로드해주세요'),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
