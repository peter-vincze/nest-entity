import {TypeOrmModule} from '@nestjs/typeorm'
import {Entity} from './entity.entity'
import {EntitySeederService} from './entity.seeder.service'
import {Module} from '@nestjs/common'
/**
 * Import and provide seeder classes for languages.
 *
 * @module
 */
@Module({
    imports: [TypeOrmModule.forRoot(),TypeOrmModule.forFeature([Entity])],
    providers: [EntitySeederService],
    exports: [EntitySeederService],
  })

export class EntitySeederModule {
}