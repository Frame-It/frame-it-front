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
}

const Drawer = ({
  title,
  open,
  onClose,
  trigger,
  onOpenChange,
  children,
}: IDrawerProps & PropsWithChildren) => {
  return (
    <UiDrawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <button className="btn-primary flex items-center justify-center">
          {trigger}
        </button>
      </DrawerTrigger>
      <DrawerContent>
        {title ? (
          <DrawerHeader className={cn('flex items-center justify-between')}>
            <DrawerTitle className={cn('text-[#4D4744]')}>{title}</DrawerTitle>
            {onClose && (
              <DrawerClose asChild>
                <button className="btn-primary" onClick={onClose}>
                  <Icon id="close-icon" size={24} />
                </button>
              </DrawerClose>
            )}
          </DrawerHeader>
        ) : (
          <DrawerTitle />
        )}
        <div className={cn('px-4 pb-4', !title && 'pt-4')}>{children}</div>
      </DrawerContent>
    </UiDrawer>
  );
};

export default Drawer;
