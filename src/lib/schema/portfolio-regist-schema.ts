import { z } from 'zod';

export const imageFileSchema = z.instanceof(File).refine(
  (file) => {
    return file.type.startsWith('image/');
  },
  {
    message: 'Only image files are allowed',
  },
);

const uploadSchema = z.object({
  photos: z.array(imageFileSchema).max(10, 'You can upload up to 10 photos'),
});

export type UploadFormValues = z.infer<typeof uploadSchema>;
