import { generateRandomImage } from '@/lib/faker';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface IFeedListProps {}

const FeedList: React.FunctionComponent<IFeedListProps> = () => {
  const imageArr = Array.from({ length: 10 }, () => generateRandomImage());

  return (
    <section className="mx-auto w-full">
      <ul className="flex w-full flex-col gap-y-4">
        {imageArr.map((image, i) => {
          return (
            <li className="overflow-hidden rounded-[8px]" key={image + i}>
              <Link href="#">
                <div className="group relative h-[458px] w-full">
                  <Image
                    src={image}
                    alt={'feedImage' + i}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 flex w-full items-center justify-between px-[12px]">
                    <Badge variant="feed">모델</Badge>
                    <Image
                      src="/png/certification-mark.png"
                      alt="활동마크"
                      width={33}
                      height={33}
                      className="aspect-square"
                    />
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default FeedList;
