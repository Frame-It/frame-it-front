import LoadingSpinner from '@/components/common/loading-spinner';

export default function Loading() {
  return (
    <div className="mx-auto flex h-full max-w-[300px] flex-col items-center justify-center gap-4 bg-white px-2">
      <h2 className="font-title-18 break-keep text-center">
        페이지를 로딩 중 입니다. 잠시만 기다려 주세요!
      </h2>
      <LoadingSpinner size={36} />
    </div>
  );
}
