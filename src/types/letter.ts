export interface IParticipant {
  user_id: string;
  imageUrl: string;
  username: string;
  role: 'author' | 'model';
}

export interface IMessage {
  message_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: string;
  status: string;
}

export interface TLetter {
  conversation_id: string;
  participants: IParticipant[];
  messages: IMessage[];
}
