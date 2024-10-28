'use client';

import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';

const MarketingSwitch = ({ checked }: { checked?: boolean }) => {
  const router = useRouter();

  const handleSwitch = async () => {
    if (checked) {
      console.log('키키키');
    } else {
      console.log('키키키');
    }
    router.refresh();
  };

  return (
    <>
      <Switch
        checked={checked}
        className="h-[24px]"
        onCheckedChange={handleSwitch}
      />
    </>
  );
};

export default MarketingSwitch;
