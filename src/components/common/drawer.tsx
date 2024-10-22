import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Drawer as UiDrawer,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { PropsWithChildren, ReactNode } from 'react';
import Icon from './icon';

interface IDrawerProps {
  title?: string;
  open: boolean;
  onClose?: () => void;
  trigger: ReactNode;
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
    <UiDrawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <div className="btn-primary flex items-center justify-center">
          {trigger}
        </div>
      </DrawerTrigger>
      <DrawerContent>
        {title ? (
          <DrawerHeader className={cn('flex items-center justify-between')}>
            <DrawerTitle className={cn('text-[#4D4744]')}>{title}</DrawerTitle>
            {onClose && (
              <DrawerClose asChild>
                <button className="btn-primary" onClick={onClose}>
                  <Icon id="close-icon" size={24} className="text-gray-40" />
                </button>
              </DrawerClose>
            )}
          </DrawerHeader>
        ) : (
          <DrawerTitle />
        )}
        <div className={cn('px-4 pb-4', !title && 'pt-4', className)}>
          {children}
        </div>
      </DrawerContent>
    </UiDrawer>
  );
};

export default Drawer;
