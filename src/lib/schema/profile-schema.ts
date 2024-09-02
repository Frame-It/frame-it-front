import { z } from 'zod';

export const profileSchema = z.object({
  profileImage: z.instanceof(File).or(z.null()),
  detail: z.string().min(20).max(500),
  tagList: z.array(z.string()).min(1).max(5),
  togather: z.string().min(3),
});

export type ProfileFormType = z.infer<typeof profileSchema>;
