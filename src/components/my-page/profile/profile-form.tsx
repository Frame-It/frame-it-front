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
import ProfileImageSelector from './image-selecor';
import ProfilSetting from './profile-setting';
import { ProfileFormType, profileSchema } from '@/lib/schema/profile-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  getUserProfileClient,
  updateProfile,
} from '@/service/client-actions/my-client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface IProfileFormProps {}

const ProfileForm = () => {
  const { data } = useQuery({
    queryKey: ['getProfile'],
    queryFn: getUserProfileClient,
    staleTime: 0,
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<ProfileFormType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      introduce: data?.description || '',
      concepts: data?.concepts || [],
    },
  });

  const onSubmit = async (values: ProfileFormType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const isModified = await updateProfile({
      id: data?.id || null,
      profileImage: values.profileImage || null,
      description: values.introduce || null,
      concepts: values.concepts || null,
    });

    if (isModified) {
      toast({
        title: '수정에 성공하였습니다!',
        variant: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['getProfile'] });
      router.replace('/my-page');
    } else {
      toast({
        title: '수정에 실패하였습니다',
        variant: 'destructive',
      });
    }
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
        <ProfileImageSelector
          form={form}
          prevImageUrl={data?.profileImageUrl}
        />
        <ProfilSetting form={form} nickname={data?.nickname} />
      </form>
    </Form>
  );
};

export default ProfileForm;
