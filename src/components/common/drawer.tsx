import { cn } from '@/lib/utils';
import { PropsWithChildren, ReactNode } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import Icon from './icon';

interface IDrawerProps {
  title?: string;
  open: boolean;
  onClose?: () => void;
  trigger?: ReactNode;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const Drawer = ({
  title,
  open,
  onClose,
  trigger,
  onOpenChange,
  children,
  className,
}: IDrawerProps & PropsWithChildren) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <SheetTrigger asChild>
          <div className="btn-primary flex items-center justify-center">
            {trigger}
          </div>
        </SheetTrigger>
      )}
      <SheetContent>
        {title ? (
          <SheetHeader className={cn('flex items-center justify-between')}>
            <SheetTitle className={cn('text-[#4D4744]')}>{title}</SheetTitle>
            {onClose && (
              <SheetClose asChild>
                <button className="btn-primary" onClick={onClose}>
                  <Icon id="close-icon" size={24} className="text-gray-40" />
                </button>
              </SheetClose>
            )}
          </SheetHeader>
        ) : (
          <SheetTitle />
        )}
        <div className={cn('px-4 pb-4', !title && 'pt-4', className)}>
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
