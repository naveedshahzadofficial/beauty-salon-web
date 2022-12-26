import { IOrderService } from "@interfaces/order-service.interface"

export interface IServiceSummary {
  category_title: string
  services: IOrderService[]
}
