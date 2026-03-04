"use client"

import { useDispatch, useSelector } from "react-redux";
import type { IRootState } from "../../store";
import { setCloseModal } from "../../store/modal/modal.slice";
import { useMemo } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import CreateProductModalContent from "../../../features/create-product/ui/create-new-product-content";
import { MODAL_CONTENTS } from "../../../app/constants/modal-contents";


const Modal = () => {

    const { isActive, title, content } = useSelector((state: IRootState) => state.modal)
    const dispatch = useDispatch()


    const closeModal = () => {
        dispatch(setCloseModal())
    }

    const Content = useMemo(() => {
        switch (content) {
            case MODAL_CONTENTS.CREATE_NEW_PRODUCT:
                return <CreateProductModalContent/>
            default:
                return null
        }
    }, [isActive, content])

    return (
            <Dialog as="div" open={isActive} onClose={closeModal}>
                <div id="slidein_up_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                    <div className="flex min-h-screen items-start justify-center px-4">
                        <DialogPanel className="bg-white panel animate__animated animate__slideInUp my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black">
                            <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3">
                                <h5 className="text-lg font-bold">{title}</h5>
                                 <button onClick={closeModal} type="button" className="text-white-dark hover:text-dark hover:bg-gray-200 px-4 py-2 rounded-xl">
                                    <i className="ti ti-x"></i>
                                </button>
                            </div>
                            {Content}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
    );
};

export default Modal;
