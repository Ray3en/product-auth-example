import { AgGridReact } from "ag-grid-react"
import { useMemo, useRef } from "react"
import { AllCommunityModule, ModuleRegistry, type ColDef, type ICellRendererParams } from "ag-grid-community"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import Pagination from "../../shared/components/pagination/index"
import { useDispatch, useSelector } from "react-redux"
import { setOpenModal } from "../../shared/store/modal/modal.slice.ts"
import type { IRootState } from "../../shared/store/index"
import { useTableLimit } from "../../shared/hooks/use-table-limit";
import type { SortOptions } from "../../entities/product/model/types.ts"
import { useGetProductsQuery } from "../../entities/product/api/index.ts"
import { MODAL_CONTENTS } from "../../app/constants/modal-contents.ts"
import { logout } from "../../features/auth/model/auth.slice.ts"
import { SortDropdown } from "../../features/sort-product/ui/index.tsx"
import SearchFilter from "../../features/search-product/ui/index.tsx"

ModuleRegistry.registerModules([AllCommunityModule]);

type ProductRow = {
    id: number;
    title: {
        name: string;
        category: string;
        image?: string;
    }
    brand: string;
    price: number;
    sku: string;
    rating: number;
    actions?: React.ReactNode;

}
const sortOptions: SortOptions[] = [
    { title: 'title', name: 'Наименование', type: 'text' },
    { title: 'brand', name: 'Вендор', type: 'text' },
    { title: 'price', name: 'Цена', type: 'number' },
    { title: 'rating', name: 'Оценка', type: 'number' },
    { title: 'sku', name: 'Артикул', type: 'text' },
];




export const ProductsPage = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const containerRef = useRef<HTMLDivElement>(null);


    const dispatch = useDispatch()
    const { products } = useSelector((store: IRootState) => store.localProducts)

    const currentPage = Number(searchParams.get("page")) || 1
    const searchTerm = searchParams.get("search") || undefined
    const sortByTerm = searchParams.get("sortBy") || undefined
    const orderTerm = searchParams.get("order") || undefined
    const limit = useTableLimit(containerRef)

    const productsResponse = useGetProductsQuery({
        page: currentPage,
        limit: limit,
        search: searchTerm,
        sortBy: sortByTerm,
        order: orderTerm
    })

    const {
        data,
        isFetching,
        isLoading,
        refetch
    } = productsResponse

    const onRefresh = () => {
        searchParams.delete('search')
        searchParams.delete('sortBy')
        searchParams.delete('order')
        searchParams.set('page', '1')
        navigate(`${pathname}?${searchParams.toString()}`)
        refetch()
    }


    const handlePageChange = (newPage: number) => {
        const queryParams = new URLSearchParams(searchParams.toString())
        queryParams.set("page", newPage.toString())
        navigate(`${pathname}?${queryParams.toString()}`)
    }

    const handleCreateNewProduct = () => {
        dispatch(setOpenModal({
            title: 'Создать новый продукт',
            content: MODAL_CONTENTS.CREATE_NEW_PRODUCT
        }))
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate('/auth/login')
    }

    const rows = useMemo<ProductRow[]>(() => {
        const apiProducts = data?.products.map(product => ({
            id: product.id,
            title: {
                name: product.title,
                category: product.category,
                image: product.thumbnail
            },
            brand: product.brand || '—',
            price: product.price,
            sku: product.sku,
            rating: product.rating,
        })) || [];

        // Объединяем локальные товары и товары из API
        return [...products, ...apiProducts]
    }, [data, products, searchParams]);

    const columns: ColDef<ProductRow>[] = [
        // { field: "id", headerName: "ID", maxWidth: 70, flex: 1 },
        {
            field: "title",
            headerName: "Наименование",
            flex: 3,
            cellRenderer: (data: ICellRendererParams<ProductRow>) => {
                return (
                    // Добавляем h-full, чтобы контейнер занимал всю высоту ячейки
                    <div className="flex items-center gap-5 h-full py-2">
                        <div className="flex-shrink-0 w-12 h-12 border border-gray-200 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                            <img
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                                src={data.value.image}
                                alt={data.value.name}
                            />
                        </div>
                        <div className="flex flex-col justify-center leading-tight">
                            <div className="font-bold text-sm text-gray-900 line-clamp-1">
                                {data.value.name}
                            </div>
                            <div className="text-xs text-gray-500">
                                {data.value.category}
                            </div>
                        </div>
                    </div>
                )
            }
        },
        {
            field: "brand",
            headerName: "Вендор",
            flex: 1,
            cellRenderer: (data: ICellRendererParams<ProductRow>) => {
                return (
                    <div className="h-full flex items-center justify-cneter font-bold">{data.value}</div>
                )
            }
        },
        {
            field: "sku",
            headerName: "Артикул",
            flex: 1,
            cellRenderer: (data: ICellRendererParams<ProductRow>) => {
                return (
                    <div className="h-full flex items-center justify-cneter">{data.value}</div>
                )
            }
        },
        {
            field: "rating",
            headerName: "Оценка",
            flex: 1,
            cellRenderer: (data: ICellRendererParams<ProductRow>) => {
                const isLowRating = data.value < 3

                return (
                    <div className={`h-full flex items-center justify-cneter `} >
                        <span className={`text-${isLowRating ? 'red-500' : 'green'}`}>{data.value.toFixed(1)}</span>/5
                    </div>
                )
            }
        },
        {
            field: "price",
            headerName: "Цена, $",
            flex: 1,
            cellRenderer: (data: ICellRendererParams<ProductRow>) => {
                return (
                    <div className="h-full flex items-center justify-cneter">{data.value} $</div>
                )
            }
        },
        {
            headerName: "Действия",
            field: "actions",
            cellRenderer: () => (
                <div className="h-full flex items-center justify-center gap-3">
                    <button
                        type="button"
                        className="flex items-center justify-center w-10 h-7 rounded-xl border border-gray-300 text-gray-600 hover:bg-blue-700 hover:text-white"
                    >
                        <i className="ti ti-plus text-sm"></i>
                    </button>

                    <button
                        type="button"
                        className="flex items-center justify-center w-7 h-7 rounded-md border border-gray-300 text-gray-600 hover:bg-blue-700 hover:text-white"
                    >
                        ...
                    </button>
                </div>
            ),
            maxWidth: 150,
            flex: 1,
        }

    ]

    return (
        <div className="h-[100vh] p-10 space-y-10">
            <div className="p-10 flex flex-col gap-5 items-center border-1 border-gray-200 rounded-xl bg-white">
                <div className="w-full flex items-center justify-between">
                    <div className="flex-1">
                        <h2 className="font-bold">Товары</h2>
                    </div>
                    <div className="flex-3">
                        <SearchFilter
                            placeholder="Найти..."
                            loading={productsResponse.isLoading || productsResponse.isFetching}
                        />
                    </div>
                    <div className="flex-1 flex justify-end">
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="hover:bg-red-700  hover:text-white font-bold py-2 px-4 rounded-xl border border-red-500 text-red-500 text-gray-700">
                            <i className="ti ti-logout"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="p-10 flex flex-col gap-5 items-center border-1 border-gray-200 rounded-xl bg-white">
                <div className="w-full flex items-center justify-between">
                    <h3 className="font-bold">Все товары</h3>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onRefresh}
                            className="w-full hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded-xl border border-gray-300 text-gray-700">
                            <i className="ti ti-refresh"></i>
                        </button>
                        <SortDropdown sortOptions={sortOptions} />
                        <button
                            type="button"
                            onClick={handleCreateNewProduct}
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl">
                            <i className="ti ti-plus pr-3"></i>
                            Добавить
                        </button>
                    </div>
                </div>
                <div ref={containerRef} className="h-[calc(100vh-430px)] w-full">
                    <AgGridReact
                        columnDefs={columns}
                        rowData={rows}
                        loading={isLoading || isFetching}
                        rowHeight={70}
                    />
                </div>
                <div className="w-full flex items-center justify-between">
                    <Pagination
                        currentPage={currentPage}
                        totalItems={data?.total ?? 0}
                        itemsPerPage={limit}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    )
}

