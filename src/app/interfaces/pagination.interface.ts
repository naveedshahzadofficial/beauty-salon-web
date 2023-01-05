import { ILinks } from '@interfaces/links.interface';
import { IMeta } from '@interfaces/meta.interface';
export interface IPagination<T> {
  data: T[];
  links: ILinks,
  meta: IMeta
}
