import {Repository, ObjectLiteral} from 'typeorm'
import { TypeormRepositoryPaginatorOptionsInterface} from  './typeorm.repository.paginator.options.interface'
import { TypeormRepositoryPaginatorResultInterface} from  './typeorm.repository.paginator.result.interface'
import { TypeormRepositoryPaginatorFindOptionsInterface} from  './typeorm.repository.paginator.find.options.interface'

export class TypeormRepositoryPaginator {
    private findOptions : TypeormRepositoryPaginatorFindOptionsInterface
    private result : TypeormRepositoryPaginatorResultInterface
    constructor(private repository: Repository<ObjectLiteral>, private paginatorOptions?: TypeormRepositoryPaginatorOptionsInterface)
    {
        this.setOptions();
    }

    public async paginate() : Promise<TypeormRepositoryPaginatorResultInterface> {
        const result = await this.resulter()
        console.log(result)
        let last : number =  result[1] == 0 ? 0 :
            (Math.trunc(result[1] / this.paginatorOptions.limit) +
            (result[1]/this.paginatorOptions.limit > 
            Math.trunc(result[1] / this.paginatorOptions.limit) ?
                1 : 0))
        this.setResultInterface()
        this.result.paginator.total = result[1]
        this.result.paginator.prev = this.paginatorOptions.page == 1 ? 1 : 
            (this.paginatorOptions.page > last ?
            last : this.paginatorOptions.page - 1)
        this.result.paginator.next = this.paginatorOptions.page >= last ? last : 
        this.paginatorOptions.page + 1
        this.result.paginator.last = last > 0 ? last : 1
        this.result.data = result[0]
        return this.result
    }
    private setResultInterface() {
        this.result = {data: [], paginator: this.setPaginatorInterface()}
    }

    private async resulter() {
        return await this.repository.findAndCount(this.findOptions);
    }

    private setPaginatorInterface() {
        return {
            total: 0,
            first: 1,
            prev : 1,
            next : 1,
            last : 1,
        }
    }
    private setOptions()
    {
        let paginatorOptions = this.setInterfaced();
        paginatorOptions.find = this.paginatorOptions.find ? this.paginatorOptions.find : {}
        paginatorOptions.page = (this.paginatorOptions.page ? 
            (Math.abs(this.paginatorOptions.page) === 0 ? 1 : Math.abs(this.paginatorOptions.page)) : 1)
        console.log(typeof this.paginatorOptions.limitAbility)            
        paginatorOptions.limit =  (typeof this.paginatorOptions.limit !== "undefined" && typeof this.paginatorOptions.limitAbility !== "undefined" && this.paginatorOptions.limitAbility.length &&
            this.paginatorOptions.limitAbility.indexOf(this.paginatorOptions.limit) > -1) ?
            this.paginatorOptions.limit :
            ((typeof this.paginatorOptions.limit === "undefined" || Math.abs(this.paginatorOptions.limit)) === 0 ? 15 : Math.abs(this.paginatorOptions.limit))
        paginatorOptions.order = typeof this.paginatorOptions.order !== "undefined" ? this.paginatorOptions.order : {};
        paginatorOptions.limitAbility = typeof this.paginatorOptions.limitAbility !== "undefined" ? this.paginatorOptions.limitAbility : [];
        paginatorOptions.orderAbility = typeof this.paginatorOptions.orderAbility !== "undefined" ? this.paginatorOptions.orderAbility : [];
        paginatorOptions.route = typeof this.paginatorOptions.route !== "undefined" ? this.paginatorOptions.route : "";
        paginatorOptions.query = {
            page: typeof this.paginatorOptions.query !== "undefined" && typeof this.paginatorOptions.query.page !== "undefined" ? this.paginatorOptions.query.page : 'page',
            limit: typeof this.paginatorOptions.query !== "undefined" && typeof this.paginatorOptions.query.limit !== "undefined" ? this.paginatorOptions.query.limit : 'limit',
            order: typeof this.paginatorOptions.query !== "undefined" && typeof this.paginatorOptions.query.order !== "undefined" ? this.paginatorOptions.query.order : 'order',
        }
        this.paginatorOptions = paginatorOptions
        this.filterConditions()
        this.setFindOptions()
   }

    private setFindOptions() {
        let findOptions = {skip: 0, limit: 15}
        for(let option in this.paginatorOptions.find){
            findOptions[option] = this.paginatorOptions.find[option]
        }
        this.findOptions = findOptions
    }

    private setInterfaced() : TypeormRepositoryPaginatorOptionsInterface {
        return  {
            find: {},
            page: 1,
            limit: 15,
            order: {},
            limitAbility: [],
            orderAbility: [],
            route:  '',
            query: {
                page: 'page',
                limit: 'limit',
                order: 'order',
            }
        };
    }

    private filterConditions() {
        let paginatorOptions = this.setInterfaced();
        for (let option in this.paginatorOptions.find) {
            if (!(['skip', 'limit', 'order'].indexOf(option) > -1)) {
                paginatorOptions[option] = this.paginatorOptions.find[option];
            }
        }
        if (this.paginatorOptions.orderAbility.length && JSON.stringify(this.paginatorOptions.order) != "{}") {
            let found = false;
            for(let order in this.paginatorOptions.orderAbility) {
                try {
                    expect(this.paginatorOptions.order).toEqual(this.paginatorOptions.orderAbility[order])
                    found = true;
                    break;
                }
                catch(error) {
                }
            }
            if (!found) {
                this.paginatorOptions.order = this.paginatorOptions.orderAbility[0];
            }
        }
    }    
}