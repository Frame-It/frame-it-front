import { faker } from '@faker-js/faker/locale/ko';
import { Badge } from '@/components/ui/badge';

interface IPortfolioContentsProps {}

const PortfolioContents: React.FunctionComponent<
  IPortfolioContentsProps
> = () => {
  const temp = {
    title: faker.music.songName(),
    contents: faker.lorem.lines(5),
    tagList: Array.from({ length: 7 }, () => faker.music.genre()),
  };
  return (
    <section className="mt-[16px] space-y-[8px]">
      <h1 className="text-[24px] font-bold leading-[32.4px]">{temp.title}</h1>
      <p className="text-[14px] font-normal leading-[21px]">{temp.contents}</p>
      <ul className="flex flex-wrap items-center gap-x-[4px] gap-y-[6px]">
        {temp.tagList.map((el, i) => (
          <li key={el + i}>
            <Badge variant="portfolioDetail">{el}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PortfolioContents;
