export interface ICoupon {
  id: number;
  coupon_title: string;
  coupon_code: string;
  discount_type: string;
  discount: number;
  min_spend: number;
  max_spend: number;
  start_datetime: string;
  end_datetime?: string | null;
  description: string;
  usage_coupon_limit: number;
  usage_user_limit: number;
  total_redeemed: number;
  self_redeemed: number;
}
