import { ICartAddon } from './cart-addon.interface';
export interface ICartItem {
  id: number;
  service_id: number;
  name: string;
  price: number;
  quantity: number;
  is_same_time: boolean;
  cartAddons?: ICartAddon[];
}
