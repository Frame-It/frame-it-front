'use client';

import BackButton from '@/components/common/back-button';
import {
  Header,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from '@/components/common/header';
import Icon from '@/components/common/icon';
import { Form } from '@/components/ui/form';
import * as React from 'react';
import ProfileImageSelector from './image-selecor';
import ProfilSetting from './profile-setting';
import { ProfileFormType, profileSchema } from '@/lib/schema/profile-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface IProfileFormProps {}

const ProfileForm: React.FunctionComponent<IProfileFormProps> = (props) => {
  const form = useForm<ProfileFormType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      concepts: [],
    },
  });

  const onSubmit = (values: ProfileFormType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  const introduce = form.watch('introduce');
  const concepts = form.watch('concepts');
  const isDisabled = introduce || concepts.length > 0;
  return (
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
              disabled={!isDisabled}
              type="submit"
              className="size-[32px] text-primary disabled:text-gray-70"
            >
              완료
            </button>
          </HeaderRight>
        </Header>
        <ProfileImageSelector />
        <ProfilSetting form={form} />
      </form>
    </Form>
  );
};

export default ProfileForm;
