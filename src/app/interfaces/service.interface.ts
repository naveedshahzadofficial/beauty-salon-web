import { IAddon } from '@interfaces/addon.interface';
export interface IService {
  id: number;
  category_id: number;
  sub_category_id?: any;
  service_title: string;
  service_slug: string;
  service_duration: number;
  service_price: number;
  is_deal: boolean;
  is_featured: boolean;
  is_addon: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  addons?: IAddon[];
}
