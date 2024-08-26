import MySturioFilter from '@/components/my-studio/filter';
import MyStudioPortfolioGallery from '@/components/my-studio/portfolio-gallery';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { generateRandomImageList } from '@/lib/faker';
import { faker } from '@faker-js/faker';
import Image from 'next/image';

export default function MyStudioPage() {
  const imageArr = Array.from({ length: 10 }, () => generateRandomImageList());

  return (
    <main className="px-[16px] py-[1px]">
      {/* 포트폴리오 헤더 */}
      <section className="mt-[27px] flex items-center gap-x-[45px]">
        <div className="relative h-[114px] w-[116px] overflow-hidden">
          <Image
            alt="profile-image"
            src={faker.image.urlPicsumPhotos()}
            fill
            className="rounded-[16px] object-cover"
          />
        </div>
        <div className="flex gap-[32px]">
          <div className="flex flex-col items-center justify-center">
            <dt className="text-[28px]">6</dt>
            <dd className="text-[14px] font-[500]">포트폴리오</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="text-[28px]">6</dt>
            <dd className="text-[14px] font-[500]">프로젝트</dd>
          </div>
        </div>
      </section>

      {/* 유저 타입*/}
      <section className="mt-[16px] flex items-center gap-x-1">
        <div className="text-[18px] font-semibold">유저 닉네임</div>
        <Badge
          type="author"
          className="flex h-[24px] w-[37px] items-center justify-center whitespace-nowrap rounded-[6px] py-[6px] text-[#4D474]"
        >
          작가
        </Badge>
      </section>

      {/* 소개 글 */}
      <section className="mt-[4px]">
        <p className="text-[14px] leading-[150%] text-[#201A17]">
          소개글이요. 저는 이런사람 입니다. 묵찌빠를 전공하였고 전공을살려
          홈프로텍터로 일하는 중이며 세계 제일의 사진사가 될겁니다.
        </p>
        <ul className="mt-[4px] flex flex-wrap items-center gap-x-[6px] gap-y-[4px]">
          <Badge variant="feed" className="h-[24px] text-[12px] font-normal">
            신비로운
          </Badge>
          <Badge variant="feed" className="h-[24px] text-[12px] font-normal">
            여행
          </Badge>
          <Badge variant="feed" className="h-[24px] text-[12px] font-normal">
            자연
          </Badge>
          <Badge variant="feed" className="h-[24px] text-[12px] font-normal">
            SF
          </Badge>
          <Badge variant="feed" className="h-[24px] text-[12px] font-normal">
            특이한
          </Badge>
          <Badge variant="feed" className="h-[24px] text-[12px] font-normal">
            이쁜
          </Badge>
        </ul>
        <div className="mt-[16px] flex items-center gap-x-[8px]">
          <Button className="h-[37px] w-full rounded-[8px] border border-[#7E7774] bg-white text-[14px] text-[#201A17]">
            프로필 편집
          </Button>
          <Button className="h-[37px] w-full rounded-[8px] bg-black text-[14px]">
            포트폴리오 등록하기
          </Button>
        </div>
      </section>

      {/* filter */}
      <MySturioFilter />

      <section className="mt-[8px] flex items-center justify-center">
        {/* empty */}
        {/* <div className="mt-[46px] space-y-1 text-center">
          <p className="text-[16px] font-[600] leading-[135%]">
            아직 등록된 포트폴리오가 없습니다.
          </p>
          <p className="text-[14px] leading-[150%] text-[#B4ADA9]">
            포트폴리오를 등록해 매력을 뽐내주세요!
          </p>
        </div> */}
      </section>
      <MyStudioPortfolioGallery imageArr={imageArr} />
    </main>
  );
}
