import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

const ProjectDescriptionSection = () => {
  const form = useFormContext();

  return (
    <div className={cn('flex flex-col gap-2')}>
      <label className={cn('font-title-16')}>프로젝트 설명</label>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                {...field}
                className={cn('resize-none border border-gray-60 p-2')}
                placeholder="ex) 자연광 스튜디오에서 함께 촬영하실 모델분을 찾습니다!"
                rows={5}
                maxLength={300}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProjectDescriptionSection;
