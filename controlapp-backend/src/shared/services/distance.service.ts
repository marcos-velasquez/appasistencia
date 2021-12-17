import { CoordinateDto } from '@core/subsidiary/dto';
import { point, distance } from '@turf/turf';

export class DistanceService {
  constructor(private origin: CoordinateDto, private target: CoordinateDto) {}

  public get() {
    let from = point([this.origin.longitude, this.origin.latitude]);
    let to = point([this.target.longitude, this.target.latitude]);
    return Math.round(distance(from, to) * 1000);
  }
}
