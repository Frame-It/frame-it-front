'use client';

import Masonry from 'react-responsive-masonry';
import Image from 'next/image';

interface IPortfolioGalleryProps {
  imageArr: {
    id: string;
    url: string;
    role: 'author' | 'model';
    isPremium: boolean;
    height: number;
  }[];
}

const MyStudioPortfolioGallery: React.FunctionComponent<
  IPortfolioGalleryProps
> = ({ imageArr }) => {
  return (
    <div className="mt-[8px]">
      {/* {imageArr.map((image) => (
        <div
          key={image.id}
          style={{
            width: '100%',
            display: 'block',
            position: 'relative',
            height: image.height,
            maxHeight: 583,
          }}
          className="max-h[358px] relative mb-[10px] w-full overflow-hidden rounded-[8px]"
        >
          <Image
            src={image.url}
            alt={'이미지 샘플'}
            fill
            className="object-cover"
            sizes="500px"
            priority
          />
        </div>
      ))} */}
      <Masonry columnsCount={2} gutter="10px">
        {imageArr.map((image, i) => (
          <Image
            key={i}
            src={image.url}
            alt="test"
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-[8px]"
            style={{ width: '100%', height: 'auto' }} // optional
          />
        ))}
        {/* {imageArr.map((image) => (
          <div
            key={image.id}
            style={{
              width: '100%',
              display: 'block',
              position: 'relative',
              height: image.height,
              maxHeight: 583,
            }}
            className="max-h[358px] relative w-full overflow-hidden rounded-[8px]"
          >
            <Image
              src={image.url}
              alt={'이미지 샘플'}
              fill
              className="object-cover"
              sizes="500px"
              priority
            />
          </div>
        ))} */}
      </Masonry>
    </div>
  );
};

export default MyStudioPortfolioGallery;
