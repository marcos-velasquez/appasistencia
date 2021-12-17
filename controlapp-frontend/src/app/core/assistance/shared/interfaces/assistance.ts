import { Subsidiary } from '@core/subsidiary/shared/interfaces/subsidiary.interface';
import { User } from '@core/user/interfaces/user';
import { CurrentType } from './../enums/types-assistance.enum';

export interface Assistance {
  register: { date: Date; type: CurrentType; subsidiary: Subsidiary }[];
  user: User;
  completed: boolean;
  createdAt: Date;
  counterCurrentType: number;
}

export interface AssistanceParse {
  name: string;
  rut: string;
  register: { date: Date; type: CurrentType; subsidiary: Subsidiary }[];
}
