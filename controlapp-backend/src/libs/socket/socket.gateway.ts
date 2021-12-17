import { Types } from 'mongoose';
import { SocketJWT } from './interfaces/socket-jwt.interface';
import { handlePreflightRequest } from './validators/cors.validator';
import { ConfigService } from '@nestjs/config';
import { OnModuleInit } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { authorize } from 'socketio-jwt';

@WebSocketGateway({ handlePreflightRequest })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  clients: Map<string, SocketJWT> = new Map();

  @WebSocketServer()
  server: Server;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    this.server?.use(
      authorize({
        secret: this.configService.get('JWT_SECRET'),
        handshake: true,
        auth_header_required: true,
      }),
    );
  }

  send(_id: string | Types.ObjectId, event: string, message: any) {
    const socket = this.clients.get(String(_id));
    if (socket) {
      socket.emit(event, message);
    }
  }

  handleConnection(socket: SocketJWT) {
    const { _id } = socket.decoded_token;
    this.clients.set(String(_id), socket);
  }

  handleDisconnect(socket: SocketJWT) {
    const { _id } = socket.decoded_token;
    this.clients.delete(String(_id));
  }
}
