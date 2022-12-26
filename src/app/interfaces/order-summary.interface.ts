export interface IOrderSummary {
  id: number;
  order_id: number;
  total_price: number;
  travel_charges: number;
  discount: number;
  deal_discount: number;
  outstanding_balance: number;
  net_total: number;
}
