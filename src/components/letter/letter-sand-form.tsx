'use client';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { ArrowUp } from 'lucide-react';
import { AutosizeTextarea } from '@/components/ui/auto-size-textarea';

interface ILetterSandFormProps {}

const FormSchema = z.object({
  contents: z.string({
    required_error: '한 글자 이상이 필요',
  }),
});

const LetterSandForm: React.FunctionComponent<ILetterSandFormProps> = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="fixed inset-x-0 bottom-0 mx-auto flex max-w-[360px] items-center justify-between bg-white px-[16px] py-[12px]"
      >
        <FormField
          control={form.control}
          name="contents"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative flex h-fit items-center rounded-[12px] bg-gray-80 px-[12px] py-[12px]">
                  <AutosizeTextarea
                    placeholder="메세지를 적어보세요."
                    {...field}
                    minHeight={21}
                    className="font-body-14 max-w-[270px] border-none bg-transparent p-0 text-gray-10 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <Button
                    type="submit"
                    className="absolute bottom-[7.5px] right-[12px] size-[30px] rounded-full"
                  >
                    <ArrowUp strokeWidth={2.5} className="size-[24px]" />
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default LetterSandForm;
