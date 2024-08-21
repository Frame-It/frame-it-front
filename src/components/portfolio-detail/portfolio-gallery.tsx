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

interface IportfolioDetailGalleryProps {}

const PortfolioDetailGallery: React.FunctionComponent<
  IportfolioDetailGalleryProps
> = () => {
  const imageArr = Array.from({ length: 10 }, () => generateRandomImageList());

  return (
    <section className="mt-[24px]">
      <Dialog>
        <DialogTrigger asChild>
          <PhotoList imageList={imageArr} />
        </DialogTrigger>
        <DialogContent
          className="border-none bg-transparent px-[16px]"
          closeClassName="right-[24px] -top-[16px]"
          closeSize="w-[24px] h-[24px] text-white"
        >
          <Carousel>
            <CarouselContent>
              {imageArr.map((image, index) => (
                <CarouselItem key={image.url + index}>
                  <div
                    className={cn('relative w-full')}
                    style={{
                      height: 183,
                    }}
                  >
                    <Image
                      src={imageArr[0].url}
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
