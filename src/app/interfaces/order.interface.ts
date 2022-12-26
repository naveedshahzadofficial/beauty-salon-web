import { ICoupon } from '@interfaces/coupon.interface';
import { IAddress } from "@interfaces/address.interface";
import { IOrderBilling } from '@interfaces/order-billing.interface';
import { IOrderService } from '@interfaces/order-service.interface';

export interface IOrder {
  id: number;
  order_date: string;
  order_time: string;
  address_id: number;
  phone: string;
  total_price: number;
  status: string;
  special_notes: string;
  address: IAddress;
  order_services: IOrderService[]
  order_billing: IOrderBilling;
  coupon?: ICoupon;
  created_at: string;
  updated_at: string;
}
