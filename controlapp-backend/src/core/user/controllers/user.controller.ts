import { EventEmitter2 } from '@nestjs/event-emitter';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user.service';
import { ExistsDto, UpdateDto, RegisterDto } from '../dto';
import { ApiFile, User } from '@shared/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '@core/auth/interfaces/current-user.interface';
import { PhotoRemover } from '@core/photo/model/remover.model';
import { Roles } from '@core/auth/decorators';
import { Role } from '@core/auth/enums/role.enum';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private eventEmitter: EventEmitter2) {}

  @Post()
  create(@Body() createUserDto: RegisterDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiParam({ name: '_id' })
  @Get(':_id')
  findOne(@Param() { _id }: ExistsDto) {
    return this.userService.findOne({ _id });
  }

  @Roles(Role.EMPLOYEE, Role.ADMIN)
  @Put()
  async update(@Body() updateDto: UpdateDto) {
    await this.userService.updateOne(updateDto._id, updateDto);
    return 'Usuario actualizado';
  }

  @Delete(':_id')
  async delete(@Param() { _id }: ExistsDto) {
    await this.userService.deleteOne(_id);
    this.eventEmitter.emit('user.deleted', _id);
    return 'Usuario eliminado';
  }

  @Patch('reset/mobileIdentifier')
  async resetMobilIdentier(@Body() { _id }: ExistsDto) {
    await this.userService.updateOne(_id, { mobileIdentifier: null });
    return 'Identificador reiniciado';
  }

  @Roles(Role.EMPLOYEE, Role.ADMIN)
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @Post('image/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() { filename }: Express.Multer.File, @User() { _id }: CurrentUser) {
    const { image } = await this.userService.findOne({ _id });
    await this.userService.updateOne(_id, { image: filename });
    new PhotoRemover(image).remove();
    return 'Foto actualizada';
  }
}
