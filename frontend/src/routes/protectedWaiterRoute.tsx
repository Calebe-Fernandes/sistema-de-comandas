import { Navigate } from "react-router-dom";

export const ProtectedWaiterRoute = ({ children } : any) => {
  const user  = localStorage.getItem('user');
  let userData
  if(user){
    userData = JSON.parse(user);
  }
  if (userData.role !== 'waiter') {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};