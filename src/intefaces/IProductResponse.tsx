export interface IProductResponse{
    products: [{
        id: number,
        name: string,
        description: string,
        cost: number
    }];
    totalCount: number
}