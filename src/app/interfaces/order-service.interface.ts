import { IOrderServiceAddon } from "@interfaces/order-service-addon.interface"

export interface IOrderService {
  id: number;
  user_id: number;
  order_id: number;
  service_id: number;
  service_title: string;
  is_deal: boolean;
  category_id: number;
  category_name: string;
  sub_category_id: number | null;
  sub_category_name: string | null;
  unit_count: number;
  unit_price: number;
  total_price: number;
  order_service_addons?: IOrderServiceAddon[]
}
