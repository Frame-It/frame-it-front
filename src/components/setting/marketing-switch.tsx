'use client';

import { Switch } from '@/components/ui/switch';
import {
  tokenDelete,
  tokenRenewal,
} from '@/service/client-actions/notification';
import { useRouter } from 'next/navigation';

const MarketingSwitch = ({
  checked,
  userId,
}: {
  checked?: boolean;
  userId?: number;
}) => {
  const router = useRouter();

  const handleSwitch = async () => {
    if (checked && userId) {
      await tokenDelete(userId);
    }

    if (!checked && userId) {
      console.log('renewal!!');

      await tokenRenewal(userId);
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
