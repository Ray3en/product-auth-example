import { createSlice } from '@reduxjs/toolkit';
import type { ModalState } from './types';

const initialState: ModalState = {
    isActive: false,
    title: null,
    content: null,
    data: undefined
};

const modalSlice = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        setCloseModal(state) {
            state.data = undefined
            state.isActive = false
            state.content = null
            state.title = null
        },
        setOpenModal(state, { payload }) {
            state.data = payload.data
            state.isActive = true
            state.content = payload.content
            state.title = payload.title
        }

    },
});

export const { setCloseModal, setOpenModal } = modalSlice.actions;

export default modalSlice.reducer;
