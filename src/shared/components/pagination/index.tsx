import React from 'react';

type PaginationProps = {
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (newPage: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange
}) => {
    const totalPages = Math.max(Math.ceil(totalItems / Math.max(itemsPerPage, 1)), 1);
    const current = Math.min(Math.max(currentPage, 1), totalPages);

    const from = totalItems === 0 ? 0 : (current - 1) * itemsPerPage + 1;
    const to = Math.min(current * itemsPerPage, totalItems);

    const getPages = () => {
        let start = Math.max(1, current - 2);
        let end = Math.min(totalPages, start + 4);

        if (end - start < 4) {
            start = Math.max(1, end - 4);
        }

        const res = [];
        for (let i = start; i <= end; i++) res.push(i);
        return res;
    };

    const pages = getPages();

    return (
        <>
            <div className="text-sm text-gray-600">
                Показано <span className="font-semibold">{from}-{to}</span> из <span className="font-semibold">{totalItems}</span>
            </div>

            <div className="flex items-center gap-1">
                <button
                    className="px-3 py-1 border rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-gray-300 hover:bg-gray-50"
                    disabled={current <= 1}
                    onClick={() => onPageChange(current - 1)}
                >
                    &lt;
                </button>

                {pages.map(num => (
                    <button
                        key={num}
                        onClick={() => onPageChange(num)}
                        className={`px-3 py-1 border rounded-md transition-colors min-w-[38px] ${current === num
                                ? 'bg-blue-600 border-blue-600 text-white font-medium'
                                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        {num}
                    </button>
                ))}

                {pages[pages.length - 1] < totalPages && (
                    <>
                        <span className="px-1 text-gray-400">...</span>
                        <button
                            onClick={() => onPageChange(totalPages)}
                            className={`px-3 py-1 border rounded-md transition-colors min-w-[38px] ${current === totalPages
                                    ? 'bg-blue-600 border-blue-600 text-white'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            {totalPages}
                        </button>
                    </>
                )}

                <button
                    className="px-3 py-1 border rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed border-gray-300 hover:bg-gray-50"
                    disabled={current >= totalPages}
                    onClick={() => onPageChange(current + 1)}
                >
                    &gt;
                </button>
            </div>
        </>
    );
};

export default Pagination;