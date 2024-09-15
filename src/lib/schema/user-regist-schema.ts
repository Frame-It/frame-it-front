import { z } from 'zod';
import { isValid, parse } from 'date-fns';

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
