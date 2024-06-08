import React from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList, IonPage } from "@ionic/react";
import sgi from "../img/sgi.png";
import { useAuth } from "./UserContext";

function Example() {
  const { user } = useAuth();

  return (
    <IonCard >
              <img alt="Silhouette of mountains" src={sgi} />
          <IonCardHeader>
            <IonCardTitle>Bienvenid(a)  {user.usuario.CT_Nombre}</IonCardTitle>
            <IonCardSubtitle>Sistema de Incidentes UCR - Sede Caribe</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
          </IonCardContent>
        </IonCard>
  );
}
export default Example;
