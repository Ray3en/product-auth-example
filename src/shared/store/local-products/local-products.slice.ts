// src/app/store/auth.slice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AddNewProductPayload, LocalProductState, ProductState } from './types';

const initialState: LocalProductState = {
    products: []
}

// title: z.string({ message: 'Имя обязательно' }),
//     brand: z.string({ message: 'Вендор обязателен' }),
//         price: z.number({ message: 'Стоимость обязательна' }),
//             sku: z.string({ message: 'Артикул обязателен' }),
//                 category: z.string({ message: 'Категория обязательна' }),


const localProductsSlice = createSlice({
    name: 'localProducts',
    initialState,
    reducers: {
        addNewLocalProduct(state, { payload }: PayloadAction<AddNewProductPayload>) {
            const newLocalProduct: ProductState = {
                title: {
                    name: payload.title,
                    category: payload.category,
                },
                rating: Math.floor(Math.random() * 5) + 1,
                id: Date.now(),
                price: payload.price,
                sku: payload.sku,
                brand: payload.brand,
            }
            state.products.push(newLocalProduct)

        }
    },
});

export const { addNewLocalProduct } = localProductsSlice.actions;
export default localProductsSlice.reducer;