import { IOrderService } from "@interfaces/order-service.interface"

export interface IServicesSummary {
  category_id: number;
  category_name: string;
  order_services: IOrderService[],
}
