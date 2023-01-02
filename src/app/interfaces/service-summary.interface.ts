import { IOrderService } from "@interfaces/order-service.interface"

export interface IServiceSummary {
  category_id: number;
  category_title: string;
  order_services: IOrderService[],
}
