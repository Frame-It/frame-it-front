import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

const RetouchingSection = () => {
  const form = useFormContext();

  return (
    <div className={cn('flex flex-col gap-2')}>
      <label className={cn('font-title-16')}>보정 내용</label>
      <FormField
        control={form.control}
        name="retouchingDetails"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                {...field}
                className={cn('resize-none border border-gray-60 p-2')}
                placeholder="추가 수정 가능한 보정 횟수, 보정 스타일, 보정 툴 등을 적어주세요"
                rows={2}
                maxLength={60}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default RetouchingSection;
