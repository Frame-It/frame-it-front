'use client';

import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

interface IportfolioDetailGalleryProps {
  imageList?: string[];
}

const PortfolioDetailGallery = ({
  imageList,
}: IportfolioDetailGalleryProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <section className="mt-[24px]">
      <Dialog>
        <DialogTrigger asChild>
          <ul className="flex w-full flex-col gap-y-4">
            {imageList?.map((el, i) => (
              <li key={'키키' + i}>
                <img
                  src={el}
                  alt={'세부 이미지' + i}
                  className="w-full rounded-[8px] object-cover"
                />
              </li>
            ))}
          </ul>
        </DialogTrigger>
        <DialogContent
          className="border-none bg-transparent px-[16px]"
          closeClassName="right-[24px] -top-[16px]"
          closeSize="w-[24px] h-[24px] text-white"
        >
          <Carousel>
            <CarouselContent>
              {imageList?.map((image) => (
                <CarouselItem
                  key={image}
                  className={cn(
                    'flex max-h-[500px] flex-col items-center justify-center',
                  )}
                >
                  <div className={cn('relative w-full')}>
                    <img
                      src={image}
                      alt={'imagecarousel'}
                      className="w-full rounded-[8px] object-cover"
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
