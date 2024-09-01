import MyPageHeader from '@/components/my-page/header';
import HelpCenter from '@/components/my-page/help-center';
import MyPageMenu from '@/components/my-page/menu';
import { Separator } from '@/components/ui/separator';

export default function MyPage() {
  return (
    <>
      <MyPageHeader />
      <MyPageMenu />
      <Separator className="my-6" />
      <HelpCenter />
    </>
  );
}
