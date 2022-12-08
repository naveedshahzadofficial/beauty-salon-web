import { ICartAddon } from './cart-addon.interface';
export interface ICartService {
  id: number;
  name: string;
  price: number;
  quantity: number;
  addons?: ICartAddon[];
}
