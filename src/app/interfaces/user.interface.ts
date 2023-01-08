import { IRole } from '@interfaces/role.interface';

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  code: string;
  mobile: string;
  email?: string;
  is_active: boolean;
  status?: string;
  updated_at: string;
  created_at: string;
  roles?: IRole[];
}
