import Icon from '@/components/common/icon';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import DaumPostcodeEmbed from 'react-daum-postcode';

interface AddressSearchDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (data: any) => void;
}

const AddressSearchDialog = ({
  isOpen,
  onOpenChange,
  onComplete,
}: AddressSearchDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-full flex-col">
        <DialogHeader className="flex h-6 w-full">
          <DialogClose asChild className="ml-auto">
            <Icon className="h-6 w-6 text-gray-40" id={'close-icon'} />
          </DialogClose>
        </DialogHeader>
        <DaumPostcodeEmbed onComplete={onComplete} style={{ height: '100%' }} />
      </DialogContent>
    </Dialog>
  );
};

export default AddressSearchDialog;
