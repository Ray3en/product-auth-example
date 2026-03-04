import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { productsApi } from '../../entities/product/api/index';
import authSlice from '../../features/auth/model/auth.slice';
import modalSlice from './modal/modal.slice'
import localProductsSlice from './local-products/local-products.slice'
import { authApi } from '../../features/auth/api/index';

const rootReducer = combineReducers({
    auth: authSlice,
    modal: modalSlice,
    localProducts: localProductsSlice,
    
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
});

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false, })
            .concat(authApi.middleware)
            .concat(productsApi.middleware)

});

export type IRootState = ReturnType<typeof rootReducer>;
