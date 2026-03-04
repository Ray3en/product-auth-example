import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createProductSchema, type CreateProductFormData } from "../../lib/create.product.form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputController from "../../../../shared/components/controllers/input.controller";
import { setCloseModal } from "../../../../shared/store/modal/modal.slice";
import { showNotification } from "../../../../shared/notification-toast/toast.notification";
import { addNewLocalProduct } from "../../../../shared/store/local-products/local-products.slice";


const CreateProductModalContent = () => {
    const dispatch = useDispatch()

    const closeModal = () => {
        dispatch(setCloseModal())
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateProductFormData>({
        resolver: zodResolver(createProductSchema),
        defaultValues: {
            title: 'Новый продукт',
            brand: 'Вендор',
            category: 'Шпильки',
            sku: 'XDDD-FDDDD-GGGG',
            price: 100,
        }
    })

    const onSubmit = async (data: CreateProductFormData) => {
        dispatch(addNewLocalProduct(data))
        showNotification('success', 'Продукт создан!')
    }

    return (
        <div className="p-5 space-y-5">
            <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                <InputController
                    type="text"
                    title="Наименование"
                    control={control}
                    name="title"
                    error={errors.title?.message}
                />
                <InputController
                    type="text"
                    title="Вендор"
                    control={control}
                    name="brand"
                    error={errors.brand?.message}
                />
                <InputController
                    type="text"
                    title="Категория"
                    control={control}
                    name="category"
                    error={errors.category?.message}
                />
                <InputController
                    type="text"
                    title="Артикул"
                    control={control}
                    name="sku"
                    error={errors.sku?.message}
                />
                <InputController
                    type="text"
                    title="Стоимость"
                    control={control}
                    name="price"
                    error={errors.price?.message}
                />
                <div className="mt-8 flex items-center justify-between">
                    <button
                        onClick={closeModal}
                        type="button"
                        className=" hover:bg-red-700 hover:text-white text-red-500 py-2 px-4 outline-1  rounded-xl"
                    >
                        Выйти
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
                    >
                        Сохранить
                    </button>
                </div>
            </form>

        </div>
    );
};

export default CreateProductModalContent;
