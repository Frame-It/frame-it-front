'use client';

import { getChatByParticipantId, postCreateChat } from '@/lib/api/chat/chat';
import { useRouter } from 'next/navigation';
import BottomButton, { BottomButtonProps } from './bottom-button';

const DMButton = ({
  participantId,
  ...buttonProps
}: BottomButtonProps & { participantId: number }) => {
  const router = useRouter();
  const handleClickDM = async () => {
    let chatRoomId = await getChatByParticipantId(participantId);
    if (chatRoomId === '') {
      chatRoomId = await postCreateChat(participantId);
    }
    router.push(`/letter-detail/${chatRoomId}`);
  };

  return <BottomButton {...buttonProps} onClick={handleClickDM} />;
};

export default DMButton;
