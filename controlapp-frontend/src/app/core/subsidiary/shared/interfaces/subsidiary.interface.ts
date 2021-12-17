import { Zone } from '@core/zone/interfaces/zone.interface';

export interface Subsidiary {
  name: string;
  coordinates: { latitude: number; longitude: number };
  zone: Zone;
  address: string;
  number: string;
  _id: string;
  status: boolean;
}
