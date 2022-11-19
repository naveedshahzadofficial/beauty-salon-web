export interface ICategory {
    id?:               number;
    category_name:     string;
    category_picture:  string;
    category_pdf_icon?: string;
    category_svg_icon: string;
    description?:      string;
    is_deal:           number;
    is_active:         number;
    deleted_at?:       Date;
    created_at?:        Date;
    updated_at?:        Date;
}
