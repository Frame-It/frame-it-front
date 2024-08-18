import Image from 'next/image';

import { cn } from '@/lib/utils';
import { generateRandomImage } from '@/lib/faker';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from '@/components/ui/carousel';

interface IportfolioDetailGalleryProps {}

const PortfolioDetailGallery: React.FunctionComponent<
  IportfolioDetailGalleryProps
> = () => {
  const imageArr = Array.from({ length: 10 }, () => generateRandomImage());

  return (
    <section className="mt-[24px]">
      <Dialog>
        <DialogTrigger asChild>
          <ul className="flex w-full cursor-pointer flex-col gap-y-4">
            {imageArr.map((image, index) => {
              return (
                <li
                  className="overflow-hidden rounded-[8px]"
                  key={image.imageUrl + index}
                >
                  <div
                    className={cn('relative w-full')}
                    style={{
                      height: image.height[index % 2],
                    }}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={'portfolioImage' + index}
                      fill
                      className="object-cover"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </DialogTrigger>
        <DialogContent
          className="border-none bg-transparent px-[16px]"
          closeClassName="right-[24px] -top-[16px]"
          closeSize="w-[24px] h-[24px] text-white"
        >
          <Carousel>
            <CarouselContent>
              {imageArr.map((image, index) => (
                <CarouselItem key={image.imageUrl + index}>
                  <div
                    className={cn('relative w-full')}
                    style={{
                      height: 183,
                    }}
                  >
                    <Image
                      src={imageArr[0].imageUrl}
                      alt={'imagecarousel'}
                      fill
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
