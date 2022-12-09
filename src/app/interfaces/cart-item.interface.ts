import { ICartAddon } from './cart-addon.interface';
export interface ICartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  addons?: ICartAddon[];
}
