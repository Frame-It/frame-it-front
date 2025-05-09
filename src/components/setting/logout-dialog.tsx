'use client';

import useDisclosure from '@/hooks/useDisclosure';
import AlertDialog from '@/components/common/alert-dialog';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

interface ILogoutDialogProps {
  children: React.ReactNode;
}

const LogoutDialog: React.FunctionComponent<ILogoutDialogProps> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure(false);
  const router = useRouter();

  return (
    <>
      <button onClick={onOpen} className="w-full text-left">
        {children}
      </button>
      <AlertDialog
        title="로그아웃 하시겠습니까?"
        desc="동일한 소셜 로그인 방법으로 \n 다시 접속할 수 있어요!"
        cancleTitle="취소"
        confirmTitle="로그아웃"
        open={isOpen}
        onConfirm={async () => {
          deleteCookie('accessToken');
          router.refresh();
          onClose();
        }}
        onCancle={() => onClose()}
        onOpenChange={() => onClose()}
      />
    </>
  );
};

export default LogoutDialog;
