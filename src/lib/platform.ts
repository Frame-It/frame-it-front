export const isNativeApp = (userAgent?: string) => {
  if (typeof window !== 'undefined') {
    return window.ReactNativeWebView !== undefined;
  }
  return userAgent?.includes('FrameItWebView') ?? false;
};
