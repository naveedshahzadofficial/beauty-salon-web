export interface IAddon {
  id: number;
  addon_title: string;
  addon_slug: string;
  addon_duration: number;
  addon_price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
