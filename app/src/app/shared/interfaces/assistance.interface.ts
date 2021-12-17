import { User } from '@app/authentication/interfaces/user.interface';
import { CurrentType } from '../enums/currentType.enum';
import { Subsidiary } from './subsidiary.interface';

export interface Assistance {
  register: { date: Date; type: CurrentType; subsidiary: Subsidiary }[];
  user: User;
  completed: boolean;
  counterCurrentType: number;
}

export interface CreateAssistance {
  subsidiary: string;
  mobileIdentifier: string;
  coordinates: { latitude: number; longitude: number };
}
