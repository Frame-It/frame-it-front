import {
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  Drawer as UiDrawer,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';
import Icon from './icon';

interface IDrawerProps {
  title: string;
  open: boolean;
  toggleOpen: () => void;
  onClose?: () => void;
}

const Drawer = ({
  title,
  open,
  toggleOpen,
  onClose,
  children,
}: IDrawerProps & PropsWithChildren) => {
  return (
    <UiDrawer open={open}>
      <DrawerTrigger asChild>
        <button className="btn-primary" onClick={toggleOpen}>
          Open Drawer
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className={cn('flex justify-between')}>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerClose asChild>
            <button className="btn-primary" onClick={toggleOpen}>
              <Icon id="close-icon" size={24} />
            </button>
          </DrawerClose>
        </DrawerHeader>
        <div className="p-4">{children}</div>
      </DrawerContent>
    </UiDrawer>
  );
};

export default Drawer;
