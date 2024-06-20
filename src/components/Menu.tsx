import React, { useEffect } from "react";
import {
  IonCard,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import "../style/Menu.css";
import { useAuth } from "./UserContext";

interface AppPage {
  url: string;
  title: string;
}

var appPages: AppPage[] = [];

const Menu: React.FC = () => {
  const location = useLocation();
  const { datos, isAuthenticated, logout, user, handleClickeo } = useAuth();
  const navigate = useHistory();
  const onSalir = () => {
    logout();
    navigate.push("/login");
  };
  useEffect(() => {
    if (isAuthenticated) {
      appPages = [
        {
          title: "Home",
          url: "/home",
        }];
     /*user.rol.map((rol) => ( 
      rol.CN_Id_Rol</IonNote> ))*/
      /*appPages = [
        {
          title: "Home",
          url: "/home",
        },
        {
          title: "Usuarios",
          url: "/usuarios",
        },{
          title: "Lista Incidentes-Usuario",
          url: "/incidentes-usuario",
        },
        {
          title: "Asignar Incidente",
          url: "/asignar-incidente",
        },
        {
          title: "Lista Incidentes-Tecnico",
          url: "/diagnosticar-incidente",
        },
        {
          title: "Supervisar Incidentes",
          url: "/supervisar-incidente",
        },{
          title: "Reportes Cargas de trabajos",
          url: "/cargas-trabajo",
        },
      ];*/

      user.rol.forEach((rol: any) => {
        if (rol.CN_Id_Rol == 1) {
          appPages.push({
            title: "Usuarios",
            url: "/usuarios",
          });
          appPages.push({
            title: "Reportes Cargas de trabajos",
            url: "/cargas-trabajo",
          });
        }else if (rol.CN_Id_Rol == 2) {
          appPages.push({
            title: "Lista Incidentes-Usuario",
            url: "/incidentes-usuario",
          });
        }else if (rol.CN_Id_Rol == 3) {
          appPages.push({
            title: "Asignar Incidente",
            url: "/asignar-incidente",
          });
        }else if (rol.CN_Id_Rol == 4) {
          appPages.push({
            title: "Lista Incidentes-Tecnico",
            url: "/diagnosticar-incidente",
          });
        }else if (rol.CN_Id_Rol == 5) {
          appPages.push({
            title: "Supervisar Incidentes",
            url: "/supervisar-incidente",
          });
        }else if (rol.CN_Id_Rol == 4) {
          
        }
        
        

      });
      console.log(appPages);
    }
  }, [isAuthenticated]);

  return (
    <IonMenu contentId="main" type="overlay" side="start">
      <IonContent>
        <IonList id="inbox-list">
          {isAuthenticated && (<IonCard><br/> 
            <IonListHeader>{user.usuario.CT_Nombre}</IonListHeader>
            <IonNote>{user.usuario.CT_Usuario}</IonNote>
            {/*Mapear user.rol[i].CN_Id_Rol*/}
            


        </IonCard>)}

          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                  onClick={
                  handleClickeo
                  }
                >
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}

          <IonMenuToggle>
            <IonItem onClick={onSalir}>
              <IonLabel>Cerra Sesion</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
