import { FC, useEffect } from "react";
import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';


const AuthContext = createContext<any>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors])
  /*const [loading, setLoading] = useState(true);

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);
*/
  const datos = async (user: any) => {
    try {
      const res = user;
      if (res) {
        setUser(res);
        setIsAuthenticated(true);
        
      }
    } catch (error: any) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };
   const logout = () => {
    //Cookies.remove("token");
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    
  };
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
  /*
  const signin = async (user: any) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      // setErrors(error.response.data.message);
    }
  };

 

  */

  return (
    <AuthContext.Provider
      value={{
        datos,
        isAuthenticated,
        user,
        nombre,
        logout,
        /*signin,
        
        
        errors,
        loading,*/
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
