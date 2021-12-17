import { SocketGateway } from '@libs/socket/socket.gateway';
import { ConnectedSocket, MessageBody, SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CoordinateDto } from '@core/subsidiary/dto';
import { Subsidiary } from '@core/subsidiary/subsidiary.schema';
import { DistanceService } from '@shared/services/distance.service';

type Positions = { subsidiary: Subsidiary; coordinates: CoordinateDto };

export class GeolocationSocket extends SocketGateway {
  @SubscribeMessage('position')
  distance(@MessageBody() { coordinates, subsidiary }: Positions, @ConnectedSocket() client: Socket) {
    const subsidairyCoords = { latitude: subsidiary.coordinates.latitude, longitude: subsidiary.coordinates.longitude };
    client.emit('position', new DistanceService(coordinates, subsidairyCoords).get());
  }
}
