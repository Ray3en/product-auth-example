type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    brand: string;
    sku: string;
    category: string;
    thumbnail: string;
}

export interface ApiProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;

}

export interface ProductsRequest{
    limit?: number 
    page?: number 
    search?: string
    sortBy?: string
    order?: string

}

export type SortOptions = {
    title: string;
    name: string;
    type: 'text' | 'number';
}