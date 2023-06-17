import { Navigate } from "react-router-dom";

export const ProtectedManagerRoute = ({ children } : any) => {
  const user  = localStorage.getItem('user');
  let userData
  if(user){
    userData = JSON.parse(user);
  }
  if (userData.role !== 'manager') {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};