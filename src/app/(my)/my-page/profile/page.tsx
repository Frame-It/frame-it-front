'use client';

import BackButton from '@/components/common/back-button';
import {
  Header,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from '@/components/common/header';
import Icon from '@/components/common/icon';
import ProfileImageSelector from '@/components/my-page/profile/image-selecor';
import { Form } from '@/components/ui/form';
import { ProfileFormType, profileSchema } from '@/lib/schema/profile-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export default function ProfilePage() {
  const form = useForm<ProfileFormType>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = (values: ProfileFormType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="pt-[58px]">
          <Header>
            <HeaderLeft>
              <BackButton>
                <Icon id="back-icon" className="size-[32px] text-gray-40" />
              </BackButton>
            </HeaderLeft>
            <HeaderCenter>프로필 편집</HeaderCenter>
            <HeaderRight>
              <button
                disabled
                type="submit"
                className="size-[32px] text-primary disabled:text-gray-70"
              >
                완료
              </button>
            </HeaderRight>
          </Header>
          <ProfileImageSelector form={form} />
        </form>
      </Form>
    </main>
  );
}
