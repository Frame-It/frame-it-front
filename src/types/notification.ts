export interface INotification {
  id: number;
  title: string;
  content: string;
  sendTime: string;
  projectStatus: string | null;
  resourcesId: number | null | string;
  isHost: boolean | null | string;
  eventType: string;
  isRead: boolean;
}
