'use client';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUp } from 'lucide-react';
import { AutosizeTextarea } from '@/components/ui/auto-size-textarea';
import { postChatMessage } from '@/lib/api/chat/chat';
import { usePathname } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

const FormSchema = z.object({
  contents: z.string({
    required_error: '한 글자 이상이 필요합니다',
  }),
});

const LetterSandForm = ({
  userId,
  disabled,
}: {
  userId?: number;
  disabled?: boolean;
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const queryClient = useQueryClient();

  const letterId = usePathname().split('/').at(-1) || '';

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await postChatMessage({
      chatId: letterId,
      userId,
      message: data.contents,
    });
    queryClient.invalidateQueries({ queryKey: ['getChatMessages'] });
    form.setValue('contents', '');
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[360px] items-center justify-between px-[16px] py-[12px]"
      >
        <FormField
          control={form.control}
          name="contents"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative flex h-fit items-center rounded-[12px] bg-gray-80 px-[12px] py-[12px]">
                  <AutosizeTextarea
                    disabled={disabled}
                    placeholder={
                      disabled
                        ? '해당 사용자는 탈퇴한 사용자 입니다.'
                        : '메세지를 적어보세요.'
                    }
                    {...field}
                    minHeight={21}
                    className="font-body-14 max-w-[270px] resize-none border-none bg-transparent p-0 text-gray-10 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    onKeyDown={(e) => {
                      const contents = form.getValues('contents');
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault(); // 엔터키가 눌렸을 때 기본 동작을 막습니다.
                        if (contents.trim()) {
                          form.handleSubmit(onSubmit)();
                        }
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    disabled={disabled}
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
