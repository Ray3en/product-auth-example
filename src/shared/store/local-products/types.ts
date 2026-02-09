
export type ProductState = {
    id: number,
    title: {
        name: string,
        category: string,
    },
    price: number,
    brand: string,
    sku: string,
    rating: number,
}

export type LocalProductState = {
    products: ProductState[]
}



export interface AddNewProductPayload {
    title: string,
    brand: string,
    price: number,
    sku: string,
    category: string,
}