import { Module } from '@nestjs/common';
import { EntityModule } from './entity/entity.module';

@Module({
  imports: [EntityModule],
  exports: [EntityModule],
})
export class AppModule {}
