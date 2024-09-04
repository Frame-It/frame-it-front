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
  toggleOpen: () => void;
  onClose?: () => void;
  trigger: ReactNode;
}

const Drawer = ({
  title,
  open,
  toggleOpen,
  onClose,
  trigger,
  children,
}: IDrawerProps & PropsWithChildren) => {
  return (
    <UiDrawer open={open}>
      <DrawerTrigger asChild>
        <button
          className="btn-primary flex items-center justify-center"
          onClick={toggleOpen}
        >
          {trigger}
        </button>
      </DrawerTrigger>
      <DrawerContent>
        {title && (
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
        )}
        <div className="p-4">{children}</div>
      </DrawerContent>
    </UiDrawer>
  );
};

export default Drawer;
