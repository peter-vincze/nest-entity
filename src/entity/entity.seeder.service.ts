import {Logger,Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Entity} from './entity.entity'
import Faker = require('faker')

@Injectable()
export class EntitySeederService {
  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {Repository<Entity>} entityRepository
   */
  constructor(
    @InjectRepository(Entity)
    private readonly entityRepository: Repository<Entity>,
  ) {}
  /**
   * Seed all entities.
   *
   * @function
   */
  async seed(n:number) {
    let generatedEntities: Entity[] = []
    for(let i = 0;i < n; i++){
        let generatedEntity = new Entity();
        generatedEntity.salary = Faker.random.number({"min": 600000, "max":900000})
        generatedEntity.name = Faker.name.findName()
        generatedEntity.email = Faker.internet.email()
        generatedEntity.docker = Faker.random.boolean()
        generatedEntity.agile = Faker.random.boolean()
        generatedEntity.start = Faker.date.between("2021-03-01", "2021-06-01")
        generatedEntity.senior = Faker.random.boolean()
        generatedEntity.fullstack = Faker.random.boolean()
        generatedEntity.description = Faker.lorem.sentences()
        const found = generatedEntities.find(element => element.email == generatedEntity.email);
        if (found || (await this.entityRepository.find({where: {email: generatedEntity.email}})).length > 0) {
          i--
        }
        else {
          generatedEntities.push(generatedEntity);
        }
    }
    await this.entityRepository.insert(generatedEntities).then(() => {
      Logger.debug(`${n} Entities created succesfully`)
    }).catch((error) => {
      throw error
    })
  }

}