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
import { updateProfile } from '@/service/client-actions/my-client';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import useMount from '@/hooks/use-mount';
import { useGetMyProfileQuery } from '@/service/profile/use-service';
import { useQueryClient } from '@tanstack/react-query';
import { profileQueryKey } from '@/service/profile/query-option';

const ProfileForm = () => {
  const { data } = useGetMyProfileQuery();
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

  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
      queryClient.invalidateQueries({ queryKey: profileQueryKey.all });
      router.replace('/my-page/my-studio');
      router.refresh();
    } else {
      toast({
        title: '수정에 실패하였습니다',
        variant: 'destructive',
      });
    }
    setLoading(false);
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
              disabled={loading}
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
            disabled={loading}
          />
          <ProfilSetting
            form={form}
            nickname={data?.nickname}
            role={(data?.identity as 'MODEL' | 'PHOTOGRAPHER') || 'MODEL'}
            disabled={loading}
          />
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
