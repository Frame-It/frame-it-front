import { generateRandomImageList } from '@/lib/faker';
import PhotoList from '../common/photo-list';

interface IFeedListProps {}

const FeedList: React.FunctionComponent<IFeedListProps> = () => {
  const imageArr = Array.from({ length: 10 }, () => generateRandomImageList());

  return (
    <section className="mx-auto w-full">
      <PhotoList imageList={imageArr} isNavigate />
    </section>
  );
};

export default FeedList;
