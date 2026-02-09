import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Spinner } from "../UI/spinner";

interface SearchFilterProps {
    loading: boolean;
    placeholder: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ loading, placeholder }) => {
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") ?? "");

    useEffect(() => {
        setSearchTerm(searchParams.get("search") ?? "");
    }, [searchParams]);

    const onSubmit = () => {
        const queryParams = new URLSearchParams(searchParams.toString());

        if (searchTerm.trim()) {
            queryParams.set("search", searchTerm.trim());
        } else {
            queryParams.delete("search");
        }

        queryParams.set("page", "1");

        navigate(`${pathname}?${queryParams.toString()}`);
    };

    return (
        <div className="flex items-center">
            <div className="relative flex rounded-md shadow-sm w-full">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onSubmit()}
                    className="block w-full rounded-none rounded-s-md border-gray-300 focus:border-primary focus:ring-primary h-10 text-sm px-3 border"
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    disabled={loading}
                    onClick={onSubmit}
                    className="relative -ml-px inline-flex items-center justify-center space-x-2 rounded-e-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-1 focus:ring-primary transition-all min-w-[45px]"
                    style={{ backgroundColor: 'var(--primary-color, #3b82f6)' }}
                >
                    {loading ? (
                        <Spinner color="white" />
                    ) : (
                        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};

export default SearchFilter;