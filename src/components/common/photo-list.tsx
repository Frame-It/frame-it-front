'use client';

import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { IFeed } from '@/types/portfolio';

interface IPhotoListProps {
  imageList: IFeed[];
  isNavigate?: boolean;
  isFeed?: boolean;
}

const PhotoList: React.FunctionComponent<IPhotoListProps> = ({
  imageList,
  isNavigate,
  isFeed,
}) => {
  const router = useRouter();

  const handleNavigate = (id: number) => {
    if (!isNavigate) return;
    router.push(`/portfolio-detail/${id}`);
  };

  return (
    <ul className="flex w-full flex-col">
      {imageList?.map((feed, i) => {
        return (
          <li
            className="relative overflow-hidden rounded-[8px]"
            key={feed.id}
            onClick={() => handleNavigate(feed.id)}
          >
            <img
              key={feed.id}
              src={feed.portfolioImageUrl}
              alt={'feed 이미지' + i}
              className="my-2 rounded-[8px]"
              style={{ width: '100%', height: 'auto' }}
            />
            {isFeed ? (
              <div className="absolute bottom-[12px] flex w-full items-end justify-between px-[12px]">
                <Badge
                  variant="feed"
                  className={cn(
                    'px-[12px]',
                    feed.identity === 'MODEL'
                      ? 'border border-white bg-[#201A17B2]/70 text-white'
                      : 'border border-[#201A17]/20 bg-[#ffffff]/70 text-gray-10',
                  )}
                >
                  {feed.identity === 'MODEL' ? '모델' : '작가'}
                </Badge>
                {/* {feed.title ? (
                  <img
                    src="/png/certification-mark.png"
                    alt="활동마크"
                    className="aspect-square size-[33px]"
                  />
                ) : null} */}
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export default PhotoList;
