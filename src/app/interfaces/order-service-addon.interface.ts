export interface IOrderServiceAddon {
  id: number
  order_service_id: number;
  service_id: number;
  addon_id: number;
  addon_title: string;
  unit_price: number;
  unit_count: number;
  total_price: number;
}
