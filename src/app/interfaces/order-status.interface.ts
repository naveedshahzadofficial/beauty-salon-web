import { IStatus } from '@interfaces/status.interface';
import { IUser } from '@interfaces/user.interface';

export interface IOrderStatus {
  id: number;
  order_id: number;
  from_user_id: number;
  to_user_id: number;
  is_allowed: boolean;
  is_seen: boolean;
  status_file: string | null;
  status_remark: string | null;
  created_at: string;
  updated_at: string;
  status: IStatus;
  from_user: IUser;
  to_user: IUser;
}
