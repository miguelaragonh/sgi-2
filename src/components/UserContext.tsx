import { FC, useEffect } from "react";
import { createContext, useContext, useState } from "react";


const AuthContext = createContext<any>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

function decodeToken(token:any) {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('El token no es un JWT válido');
  }

  const payload = parts[1];
  const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
  
  try {
   return JSON.parse(decodedPayload);
  } catch (err) {
    console.error('Error al decodificar la carga útil del token', err);
    return null;
  }
}

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
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) { 
      const usuarios=decodeToken(token);
      setUser(usuarios);
      setIsAuthenticated(true);
     
    }
  }, []);
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
   const logout = async () => {
    //Cookies.remove("token");
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);

    if ('caches' in window) {
      try {
          const cacheNames = await caches.keys();
          await Promise.all(
              cacheNames.map(cacheName => caches.delete(cacheName))
          );
          console.log('Cache cleared');
      } catch (error) {
          console.error('Error clearing cache', error);
      }
  }
    
  };
  
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
