import { FC, useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { c } from "vite/dist/node/types.d-aGj9QkWt";


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
  

  //exportar un estado de clickeo 



 const [click, setClick] = useState(false);

 const handleClickeo = () =>{setClick(!click);
 } ;


  return (
    <AuthContext.Provider
      value={{
        datos,
        isAuthenticated,
        user,
        nombre,
        logout,
        click,
        handleClickeo

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
