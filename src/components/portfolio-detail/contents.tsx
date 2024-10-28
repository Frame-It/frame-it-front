import { Badge } from '@/components/ui/badge';

interface IPortfolioContentsProps {
  title?: string;
  description?: string;
  tags?: string[];
}

const PortfolioContents = ({
  title,
  description,
  tags,
}: IPortfolioContentsProps) => {
  return (
    <section className="mt-[16px] space-y-[8px]">
      <h1 className="text-[24px] font-bold leading-[32.4px]">{title}</h1>
      <p className="text-[14px] font-normal leading-[21px]">{description}</p>
      <ul className="flex flex-wrap items-center gap-x-[4px] gap-y-[6px]">
        {tags?.map((el, i) => (
          <li key={el + i}>
            <Badge variant="portfolioDetail">{el}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PortfolioContents;
