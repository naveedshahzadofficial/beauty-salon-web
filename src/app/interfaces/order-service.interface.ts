import { IOrderServiceAddon } from "@interfaces/order-service-addon.interface"

export interface IOrderService {
  id: number;
  user_id: number;
  order_id: number;
  service_id: number;
  unit_count: number;
  unit_price: number;
  total_price: number;
  order_service_addons?: IOrderServiceAddon[]
}
