export interface TypeormRepositoryPaginatorOptionsInterface {
    find?: {},
    page?: number,
    limit?: number,
    order?: {},
    limitAbility?: number[],
    orderAbility?: {}[],
    route?: string,
    query?: {
        page?: string,
        limit?: string,
        order?: string,
    },
    [key: string]: any
}