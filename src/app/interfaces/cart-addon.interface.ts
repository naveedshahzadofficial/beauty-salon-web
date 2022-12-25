export interface ICartAddon {
  id: number;
  cart_item_id: number;
  service_id: number;
  addon_id: number;
  name: string;
  price: number;
  quantity: number;
  is_same_time: boolean;
}
