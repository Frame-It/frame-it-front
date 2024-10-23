import { TagList } from '@/components/common/tag-list';
import { ITag, USER_CONCEPTS } from '@/constants/project';
import { FC } from 'react';

interface HostInfoProps {
  hostId: number;
  nickname: string;
  profileImageUrl: string | null;
  description: string;
  concepts: string[];
}

const HostInfo: FC<HostInfoProps> = ({
  hostId,
  nickname,
  profileImageUrl,
  description,
  concepts,
}) => {
  const tags = concepts
    .map((conceptId) => USER_CONCEPTS.find(({ id }) => id === conceptId))
    .filter((tag): tag is ITag => tag !== undefined);

  // TODO: 클릭 시 스튜디오 페이지로 이동
  return (
    <section className="flex flex-col items-center justify-center gap-[10px] self-stretch rounded-[8px] bg-gray-90 px-[16px] pb-[18px] pt-[16px]">
      <div className="flex flex-col items-center justify-center gap-[6px] self-stretch">
        <img
          className="h-[64px] w-[64px] rounded-[8px]"
          src={profileImageUrl || '/png/profile.png'}
          alt={`${nickname}의 프로필 사진`}
        />
        <div className="font-body-14m">{nickname}</div>
      </div>
      <div className="flex flex-col items-center justify-center gap-[10px] self-stretch">
        <div className="font-body-14">{description}</div>
        <div>
          <TagList tags={tags} size={'medium'} className="gap-[4px]" />
        </div>
      </div>
    </section>
  );
};

export default HostInfo;
