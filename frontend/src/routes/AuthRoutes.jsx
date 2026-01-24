import { Navigate } from "react-router-dom"


const AuthRoute = ({children}) => {
    const token = localStorage.getItem("access")

    return token ? <Navigate to="/home" replace /> : children
}

export default AuthRoute