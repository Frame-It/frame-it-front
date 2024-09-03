import { FC, PropsWithChildren } from 'react';
import BottomButton from '../common/bottom-button';

const DrawerContentLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      {children}
      <BottomButton
        variant={'primary'}
        size={'large'}
        label={'필터 적용하기'}
      />
    </div>
  );
};

export const ConceptDrawerContent = () => {
  return <DrawerContentLayout></DrawerContentLayout>;
};

export const LocationDrawerContent = () => (
  <DrawerContentLayout></DrawerContentLayout>
);
export const DateDrawerContent = () => (
  <DrawerContentLayout></DrawerContentLayout>
);
export const PlaceDrawerContent = () => (
  <DrawerContentLayout></DrawerContentLayout>
);
