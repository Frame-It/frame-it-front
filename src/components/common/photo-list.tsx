'use client';

import Image from 'next/image';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface IPhotoListProps {
  imageList: {
    id: string;
    url: string;
    isPremium?: boolean;
    role: 'model' | 'author';
    height: number;
  }[];
  isNavigate?: boolean;
}

const PhotoList: React.FunctionComponent<IPhotoListProps> = ({
  imageList,
  isNavigate,
}) => {
  const router = useRouter();

  const handleNavigate = (id: string) => {
    if (!isNavigate) return;

    router.push(`/portfolio-detail/${id}`);
  };

  return (
    <ul className="flex w-full flex-col gap-y-4">
      {imageList.map((image) => {
        return (
          <li
            className="relative overflow-hidden rounded-[8px]"
            key={image.id}
            onClick={() => handleNavigate(image.id)}
          >
            <Image
              key={image.id}
              src={image.url}
              alt={'feed 이미지' + image.id}
              width={0}
              height={0}
              sizes="360px"
              className="rounded-[8px]"
              style={{ width: '100%', height: 'auto' }}
            />
            <div className="absolute bottom-2 flex w-full items-center justify-between px-[12px]">
              <Badge
                variant="feed"
                className={cn(
                  'px-[12px]',
                  image.role === 'model'
                    ? 'bg-white bg-opacity-70 text-[#201A17]'
                    : 'bg-[#201A17B2] bg-opacity-70 text-white',
                )}
              >
                {image.role === 'model' ? '모델' : '작가'}
              </Badge>

              {image.isPremium ? (
                <Image
                  src="/png/certification-mark.png"
                  alt="활동마크"
                  width={33}
                  height={33}
                  className="aspect-square"
                />
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PhotoList;
