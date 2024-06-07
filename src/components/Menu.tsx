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
  const { datos, isAuthenticated, logout, user } = useAuth();
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
        },
        {
          title: "About Me",
          url: "/aboutme",
        },
        {
          title: "Usuarios",
          url: "/usuarios",
        },{
          title: "Lista Incidentes-Usuario",
          url: "/incidentes-usuario",
        },
      ];
    }
  }, [isAuthenticated]);

  return (
    <IonMenu contentId="main" type="overlay" side="end">
      <IonContent>
        <IonList id="inbox-list">
          {isAuthenticated && (<IonCard><br/> 
            <IonListHeader>{user.usuario.CT_Nombre}</IonListHeader>
            <IonNote>{user.usuario.CT_Usuario}</IonNote>
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
