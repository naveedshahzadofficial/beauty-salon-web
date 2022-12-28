export interface IOrderBilling {
  id: number;
  order_id: number;
  actual_price: number;
  travel_charges: number;
  waiting_charges: number;
  coupon_discount: number;
  deal_discount: number;
  free_service_redeemed_discount: number;
  discount: number;
  net_total: number;
  order_discounts: any[];
}
