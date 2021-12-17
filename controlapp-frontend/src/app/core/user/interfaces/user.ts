import { ROLE } from '@core/authentication/shared/enums/role.enum';

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  rut: string;
  address: string;
  phone: string;
  role: ROLE;
  _id: string;
  status: boolean;
}
