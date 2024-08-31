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
      {imageList.map((image, index) => {
        return (
          <li
            className="overflow-hidden rounded-[8px]"
            key={image.id}
            onClick={() => handleNavigate(image.id)}
          >
            <div
              style={{
                width: '100%',
                display: 'block',
                position: 'relative',
                height: image.height,
                maxHeight: 583,
              }}
              className="aspect-video"
            >
              <Image
                src={image.url}
                alt={'피드 이미지' + index}
                fill
                className="object-cover"
                sizes="500px"
                priority
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
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PhotoList;
