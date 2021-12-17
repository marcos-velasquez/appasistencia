import { Module } from '@nestjs/common';
import { IsUniqueConstraint, ExistsConstraint } from './validators';

@Module({
  providers: [IsUniqueConstraint, ExistsConstraint],
})
export class SharedModule {}
