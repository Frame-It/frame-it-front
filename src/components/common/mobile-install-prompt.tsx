import { Share, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IMobileInstallPromptProps {
  handleInstallClick: () => void;
  handleCancelClick: () => void;
  handleCancelForever: () => void;
  platform: 'ios' | 'android';
}

const MobileInstallPrompt = ({
  handleInstallClick,
  handleCancelClick,
  handleCancelForever,
  platform,
}: IMobileInstallPromptProps) => {
  return (
    <div className="fixed bottom-[68px] mx-auto flex w-full max-w-[360px] items-center justify-center xl:absolute">
      <div className="flex w-full flex-col rounded-lg border bg-white px-[12px] py-6 text-center shadow-lg">
        <h2 className="font-title-16">아직 앱을 설치 하지 않으셨나요?</h2>
        <p className="font-body-14 mt-[6px] text-gray-20">
          앱을 설치하고 다양한 알림을 받아보세요!
        </p>
        <XIcon
          onClick={() => handleCancelClick()}
          className="absolute right-4 top-4"
        />

        {platform === 'ios' ? (
          <div className="my-4 mt-2 flex items-center justify-center gap-x-2 rounded-md border border-gray-20 p-4">
            하단의 <Share /> 아이콘을 클릭하여 설치해 주세요!
          </div>
        ) : (
          <Button
            variant="secondary"
            size="lg"
            onClick={handleInstallClick}
            className="mx-auto my-4 w-1/2 rounded-full"
          >
            설치하기
          </Button>
        )}
        <button
          onClick={handleCancelForever}
          className="text-center text-sm font-medium text-gray-40 underline"
        >
          다시 보지 않기
        </button>
      </div>
      {/* <div className="rounded-lg border bg-white px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="font-title-16">아직 앱을 설치하지 않으셨나요?</h2>
          <button onClick={() => handleCancelClick()}>
            <XIcon size={18} />
          </button>
        </div>
        <div className="mt-2">
          <p className="font-caption-12 text-gray-20">
            Frameit의 알림을 받고싶으시다면, 앱을 설치해 주세요!
          </p>
        </div>
        {platform === 'android' && (
          <>
            <div className="mt-2 flex w-full items-center justify-end gap-x-2">
              <button
                onClick={() => handleCancelClick()}
                className="font-caption-12 text-gray-20"
              >
                지금은 안할래요
              </button>
              <Button
                size="sm"
                onClick={handleInstallClick}
                className="rounded-full px-4 text-xs"
              >
                설치
              </Button>
            </div>
          </>
        )}
        {platform === 'ios' && (
          <div className="mt-2 flex justify-around">
            하단의 <Share /> 아이콘을 클릭하여 설치해 주세요!
          </div>
        )}
      </div> */}
    </div>
  );
};

export default MobileInstallPrompt;
