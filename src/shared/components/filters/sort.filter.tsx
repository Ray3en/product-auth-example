import { useState, useRef, useEffect } from "react"
import { useSearchParams, useNavigate, useLocation } from "react-router-dom"
import type { SortOptions } from "../../../pages/products-page"


interface SortDropdownProps {
    sortOptions: SortOptions[]
}


export const SortDropdown: React.FC<SortDropdownProps> = ({ sortOptions }) => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const activeSort = searchParams.get("sortBy") || undefined
    const activeOrder = searchParams.get("order") || undefined

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const toggleSort = (field: string, direction: 'asc' | 'desc') => {
        const queryParams = new URLSearchParams(searchParams.toString())

        if (activeSort === field && activeOrder === direction) {
            queryParams.delete("sortBy")
            queryParams.delete("order")
        } else {
            queryParams.set("sortBy", field)
            queryParams.set("order", direction)
        }

        navigate(`${pathname}?${queryParams.toString()}`)
    }

    return (
        <div className="relative inline-block w-full" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full font-bold py-2 px-4 rounded-xl border transition-all ${
                    activeSort 
                    ? "bg-blue-700 text-white border-blue-700" 
                    : "border-gray-300 text-gray-700 hover:bg-blue-700 hover:text-white"
                }`}
            >
                <i className="ti ti-filter-2"></i>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="max-h-[350px] overflow-y-auto p-1">
                        {sortOptions.map((option) => {
                            const isActive = activeSort === option.title

                            return (
                                <div key={option.title} className={`p-2 mb-1 rounded-lg transition-colors ${isActive ? 'bg-blue-50' : ''}`}>
                                    <div className="flex justify-between items-center mb-2 px-1">
                                        <span className={`text-sm ${isActive ? 'font-bold text-blue-700' : 'text-gray-600'}`}>
                                            {option.name}
                                        </span>
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => toggleSort(option.title, 'asc')}
                                            className={`flex-1 text-[11px] py-1.5 rounded-md border transition-all ${
                                                isActive && activeOrder === 'asc'
                                                ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                                : 'bg-white border-gray-200 text-gray-500 hover:border-blue-300'
                                            }`}
                                        >
                                            {option.type === 'number' ? '0-9 ↑' : 'А-Я ↑'}
                                        </button>
                                        <button
                                            onClick={() => toggleSort(option.title, 'desc')}
                                            className={`flex-1 text-[11px] py-1.5 rounded-md border transition-all ${
                                                isActive && activeOrder === 'desc'
                                                ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                                : 'bg-white border-gray-200 text-gray-500 hover:border-blue-300'
                                            }`}
                                        >
                                            {option.type === 'number' ? '9-0 ↓' : 'Я-А ↓'}
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}