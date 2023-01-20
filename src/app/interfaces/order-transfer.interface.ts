import { IUser } from '@interfaces/user.interface';
import { IStatus } from '@interfaces/status.interface';
import { IOrder } from "@interfaces/order.interface";

export interface IOrderTransfer {
  order: IOrder;
  statuses: IStatus[];
  staffs: IUser[];
}
