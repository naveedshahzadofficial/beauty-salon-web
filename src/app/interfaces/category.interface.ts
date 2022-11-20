export interface ICategory {
    id:                number;
    category_name:     string;
    category_picture:  string;
    category_pdf_icon: string;
    category_svg_icon: string;
    description:       null | string;
    is_deal:           number;
    is_active:         number;
    created_at:        string;
    updated_at:        string;
}
