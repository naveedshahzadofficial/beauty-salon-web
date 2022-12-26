import { ILink } from "@interfaces/link.interface"

export interface IMeta {
  current_page: number
  from: number
  last_page: number
  links: ILink[]
  path: string
  per_page: number
  to: number
  total: number
}
