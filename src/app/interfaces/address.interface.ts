import { IArea } from './area.interface';
import { ICity } from './city.interface';
export interface IAddress {
  id: number
  user_id: number
  city_id: number
  area_id: number
  address_title?: string
  address_1: string
  address_2?: string
  is_default: number
  landmark?: string
  latitude?: string
  longitude?: string
  zip_code?: string
  created_at: string
  updated_at: string
  city: ICity,
  area: IArea,
}
