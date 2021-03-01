import {TypeormRepositoryPaginatorInterface} from './typeorm.repository.paginator.interface'
import {ObjectLiteral} from 'typeorm'

export interface TypeormRepositoryPaginatorResultInterface  {
    data: ObjectLiteral[],
    paginator: TypeormRepositoryPaginatorInterface
}