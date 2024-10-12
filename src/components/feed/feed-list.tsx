import PhotoList from '../common/photo-list';
import { Feed } from '@/types/portfolio';

interface IFeedListProps {
  feedList: Feed[];
}

const FeedList: React.FunctionComponent<IFeedListProps> = ({ feedList }) => {
  return (
    <section className="mx-auto w-full">
      <PhotoList imageList={feedList} isNavigate isFeed />
    </section>
  );
};

export default FeedList;
