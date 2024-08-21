'use client';

import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/components/ui/carousel';
import PhotoList from '../common/photo-list';
import { generateRandomImageList } from '@/lib/faker';
import { useEffect, useState } from 'react';

interface IportfolioDetailGalleryProps {}

const PortfolioDetailGallery: React.FunctionComponent<
  IportfolioDetailGalleryProps
> = () => {
  const imageArr = Array.from({ length: 10 }, () => generateRandomImageList());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="mt-[24px]">
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <PhotoList imageList={imageArr} />
          </div>
        </DialogTrigger>
        <DialogContent
          className="border-none bg-transparent px-[16px]"
          closeClassName="right-[24px] -top-[16px]"
          closeSize="w-[24px] h-[24px] text-white"
        >
          <Carousel>
            <CarouselContent>
              {imageArr.map((image) => (
                <CarouselItem
                  key={image.id}
                  className={cn(
                    'flex max-h-[500px] flex-col items-center justify-center',
                    `h-[${image.height}px]`,
                  )}
                >
                  <div
                    className={cn('relative w-full')}
                    style={{
                      height: image.height,
                    }}
                  >
                    <Image
                      src={image.url}
                      alt={'imagecarousel'}
                      fill
                      priority
                      sizes="500px"
                      className="rounded-[8px] object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots className="mt-[8px]" />
          </Carousel>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PortfolioDetailGallery;
