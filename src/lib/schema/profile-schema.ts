import { z } from 'zod';

export const profileSchema = z.object({
  introduce: z.string().optional(),
  concepts: z.array(z.string()).refine((value) => value.some((item) => item)),
});

export type ProfileFormType = z.infer<typeof profileSchema>;
