import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetMeQuery } from "../../../shared/api/features/auth/auth.api";
import { logout } from "../../../shared/store/auth/auth.slice";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')

    const { isLoading, isError } = useGetMeQuery(undefined, {
        skip: !token, 
    })

    useEffect(() => {
        if (isError || !token) {
            dispatch(logout())
            navigate('/auth/login')
        }
    }, [isError, dispatch, navigate])

    if (!token){
        return null
    } 

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50">
                <p className="text-lg font-medium text-blue-600 animate-pulse">
                    Проверка сессии...
                </p>
            </div>
        )
    }

    return <>{children}</>
}