import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext"

const PrivateRoute = ({children} : any) => {
    const { user } = useUserContext();

  return (
    user && user.isLogued ? children : <Navigate to="/login" />
  )
}

export default PrivateRoute