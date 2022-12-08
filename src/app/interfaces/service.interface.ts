export interface IService {
  id: number;
  category_id: number;
  sub_category_id?: any;
  service_title: string;
  service_slug: string;
  service_duration: number;
  service_price: number;
  is_deal: number;
  is_featured: number;
  is_addon: number;
  is_active: number;
  created_at: string;
  updated_at: string;
}
