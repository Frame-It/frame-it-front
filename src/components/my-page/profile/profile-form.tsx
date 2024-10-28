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
import { useEffect } from 'react';
import useMount from '@/hooks/use-mount';

const ProfileForm = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getProfile'],
    queryFn: getUserProfileClient,
    staleTime: 0,
    gcTime: 0,
  });

  const mount = useMount();

  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<ProfileFormType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      introduce: '',
      concepts: [],
      isDelete: false,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        introduce: data.description || undefined,
        concepts: data.concepts || undefined,
        isDelete: false,
      });
    }
  }, [data, form]);

  const onSubmit = async (values: ProfileFormType) => {
    console.log(values);

    const isModified = await updateProfile({
      id: data?.id || null,
      profileImage: values.profileImage || null,
      description: values.introduce || null,
      concepts: values.concepts || null,
      isDelete: values.isDelete || false,
    });

    if (isModified) {
      toast({
        title: '수정에 성공하였습니다!',
        variant: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['getProfile'] });
      router.replace('/my-page/my-studio');
      router.refresh();
    } else {
      toast({
        title: '수정에 실패하였습니다',
        variant: 'destructive',
      });
    }
  };

  if (!mount) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="pt-[58px] xl:pt-0"
      >
        <Header>
          <HeaderLeft>
            <BackButton>
              <Icon id="back-icon" className="size-[32px] text-gray-40" />
            </BackButton>
          </HeaderLeft>
          <HeaderCenter>프로필 편집</HeaderCenter>
          <HeaderRight>
            <button
              type="submit"
              className="size-[32px] text-primary disabled:text-gray-70"
            >
              완료
            </button>
          </HeaderRight>
        </Header>
        <div className="px-4">
          <ProfileImageSelector
            form={form}
            prevImageUrl={data?.profileImageUrl}
          />
          <ProfilSetting
            form={form}
            nickname={data?.nickname}
            role={(data?.identity as 'MODEL' | 'PHOTOGRAPHER') || 'MODEL'}
          />
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
