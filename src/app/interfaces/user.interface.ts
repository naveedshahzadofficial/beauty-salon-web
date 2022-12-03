import { IRole } from './role.interface';

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  mobile: string;
  email?: string;
  updated_at: string;
  created_at: string;
  roles?: IRole[];
}
