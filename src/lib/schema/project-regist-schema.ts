import { z } from 'zod';

const MAX_FILE_SIZE = 30 * 1024 * 1024;

export const projectImageSchema = z.object({
  images: z
    .array(
      z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
        message: 'Each file must be less than 30MB',
      }),
    )
    .min(1, 'At least one file is required.')
    .max(10, 'You can upload up to 10 images.'),
});

export type ProjectImageFormValues = z.infer<typeof projectImageSchema>;
