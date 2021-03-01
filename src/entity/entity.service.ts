import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,FindManyOptions } from 'typeorm';
import { Entity } from './entity.entity';
import {TypeormRepositoryPaginator} from '../typeormrepositorypaginator/typeorm.repository.paginator'
import { TypeormRepositoryPaginatorOptionsInterface} from  '../typeormrepositorypaginator/typeorm.repository.paginator.options.interface'
/*import { CreateEntityDto } from './dto/create-entity.dto';
import { UpdateEntityDto } from './dto/update-entity.dto';*/

@Injectable()
export class EntityService {
  constructor(
    @InjectRepository(Entity) private entityRepository: Repository<Entity>,
  ) {} 
  paginatedList(findOptions?: TypeormRepositoryPaginatorOptionsInterface) {
    return new TypeormRepositoryPaginator(this.entityRepository, findOptions).paginate()
  }
  /*create(createEntityDto: CreateEntityDto) {
    return 'This action adds a new entity';
  }*/

  /*findAll() {
    return `This action returns all entity`;
  }*/

  /*findOne(id: number) {
    return `This action returns a #${id} entity`;
  }*/

  /*update(id: number, updateEntityDto: UpdateEntityDto) {
    return `This action updates a #${id} entity`;
  }*/

  /*remove(id: number) {
    return `This action removes a #${id} entity`;
  }*/
}
