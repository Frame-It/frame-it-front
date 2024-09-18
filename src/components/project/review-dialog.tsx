import { cn } from '@/lib/utils';
import ConceptTag from '../common/concept-tag';
import Icon from '../common/icon';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

interface ReviewDialogProps {
  trigger?: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  name?: string;
}

const ReviewDialog = ({
  trigger,
  isOpen,
  onOpenChange,
  name,
}: ReviewDialogProps) => {
  const tags = [
    {
      id: 1,
      label: '약속시간을 잘 지켜요',
    },
    {
      id: 2,
      label: '매너가 좋아요',
    },
    {
      id: 3,
      label: '커뮤니케이션이 잘 돼요',
    },
  ];

  const review = `처음이라 어색했는데 제가 원하는 컨셉에 따라 포징도 잘해주셨습니다. 덕분에 좋은 촬영을 했어요. 감사합니다 :)`;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[312px] gap-3 p-[18px]">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="font-title-18 text-gray-20">
            {name ? <span className="text-primary">{name}</span> : '나'}의 리뷰
          </DialogTitle>
          <DialogClose asChild>
            <Icon className="h-6 w-6 text-gray-40" id={'close-icon'} />
          </DialogClose>
        </DialogHeader>
        <div
          className={cn(
            'flex flex-wrap content-start items-start gap-[6px] self-stretch',
          )}
        >
          {tags.map((tag) => (
            <ConceptTag
              key={tag.id}
              id={tag.id}
              label={tag.label}
              isSelected={true}
            />
          ))}
        </div>
        <p
          className={cn(
            'font-body-14 flex max-h-[127px] min-h-[83px] items-start self-stretch rounded-md border border-gray-60 p-3 text-gray-20',
          )}
        >
          {review}
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
