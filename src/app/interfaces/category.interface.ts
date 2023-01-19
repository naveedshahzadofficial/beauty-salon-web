export interface ICategory {
  id: number;
  category_name: string;
  category_slug: string;
  category_picture: string;
  category_pdf_icon: string;
  category_svg_icon: string;
  short_description: null | string;
  description: null | string;
  is_deal: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
