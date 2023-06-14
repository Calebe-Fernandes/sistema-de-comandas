import { Navigate } from "react-router-dom";

export const ProtectedCashierRoute = ({ children } : any) => {
  const user  = localStorage.getItem('user');
  let userData
  if(user){
    userData = JSON.parse(user);
  }
  if (userData.role !== 'cashier') {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};