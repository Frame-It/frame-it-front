export interface IParticipant {
  id: number;
  name: string;
  profileImageUrl: string;
  identity: 'MODEL' | 'PHOTOGRAPHER';
}

export interface IChat {
  chatId: number;
  participants: IParticipant;
  lastMessage: string;
  lastMessageTime: string;
  unreadMessageCount: number;
}

export interface ISender {
  id: number;
  name: string;
  profileImageUrl: string;
}

export interface IMessage {
  messageId: number;
  sender: ISender;
  timeStamp: string;
  content: string;
  isMe: boolean;
}

export interface IParticipant {
  id: number;
  name: string;
  profileImageUrl: string;
}

export interface IChatDetail {
  chatId: number;
  participants: IParticipant[];
  messages: IMessage[];
  isQuit: boolean;
}
