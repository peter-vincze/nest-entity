import { NestFactory,NestApplication } from '@nestjs/core';
import { EntitySeederModule } from './entity/entity.seeder.module';
import { EntitySeederService } from './entity/entity.seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(EntitySeederModule)
  await app.get(EntitySeederService).seed(100).then(async () => {
    await app.close()
  })
}
bootstrap();