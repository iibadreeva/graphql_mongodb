import { Types } from '@/components/Notification';

export type ViewerType = {
  id: string | null;
  token: string | null;
  avatar: string | null;
  hasWallet: boolean | null;
  didRequest: boolean;
};

export type NotifyType = {
  status: boolean;
  type: Types | string;
  message: string;
};

export type ClickType = (event: Event) => void;
