'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface IPhotoListProps {
  imageList: {
    url: string;
    isPremium?: boolean;
    role: 'model' | 'author';
    height: number;
  }[];
}

const PhotoList: React.FunctionComponent<IPhotoListProps> = ({ imageList }) => {
  return (
    <ul className="flex w-full flex-col gap-y-4">
      {imageList.map((image, index) => {
        return (
          <li className="overflow-hidden rounded-[8px]" key={image.url + index}>
            <Link href="#">
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
                  priority
                />
                <div className="absolute bottom-2 flex w-full items-center justify-between px-[12px]">
                  <Badge
                    variant="feed"
                    className={cn(
                      '',
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
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PhotoList;
