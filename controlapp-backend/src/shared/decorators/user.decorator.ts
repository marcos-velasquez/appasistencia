import { Types } from 'mongoose';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = { ...request.user };
  user._id = new Types.ObjectId(request.user._id);
  return user;
});
