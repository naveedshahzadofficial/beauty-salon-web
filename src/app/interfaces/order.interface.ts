import { IUser } from '@interfaces/user.interface';
import { ICoupon } from '@interfaces/coupon.interface';
import { IAddress } from "@interfaces/address.interface";
import { IOrderBilling } from '@interfaces/order-billing.interface';
import { IOrderService } from '@interfaces/order-service.interface';
import { IServicesSummary } from '@interfaces/services-summary.interface';

export interface IOrder {
  id: number;
  user_id: number;
  address_id: number;
  coupon_id?: number | null;
  order_no: string;
  order_date: string;
  order_time: string;
  phone: string;
  total_price: number;
  status: string;
  special_notes: string;
  user: IUser;
  address: IAddress;
  order_services: IOrderService[],
  services_summary: IServicesSummary[],
  order_billing: IOrderBilling;
  coupon?: ICoupon;
  created_at: string;
  updated_at: string;
}
