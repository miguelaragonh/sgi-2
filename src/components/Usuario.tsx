import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
} from "@ionic/react";
import Modal from "./Modal";

function Usuario() {
  return (
    <>
        <IonItem style={{ justifyContent: "center", textAlign: "center"}}>
          <IonLabel>Lista de Usuarios</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>
            <Modal />
          </IonLabel>
        </IonItem>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Miguel Aragon Duarte</IonCardTitle>
            <IonCardSubtitle>Cedula: 701450245</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Correo:luis.aragonduarte@ucr.ac.cr <br />
            Numero Telefonico: 61781852
            <br />
            CT_Puesto : Desarrollador Web <br />
            Departamento: IT
          </IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol size="2" offset="0">
                <IonButton fill="outline" size="small" color="sumary">
                  Editar
                </IonButton>
              </IonCol>
              <IonCol size="2" offset="1">
                <IonButton fill="outline" size="small" color="danger">
                  Eliminar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Miguel Aragon Duarte</IonCardTitle>
            <IonCardSubtitle>Cedula: 701450245</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Correo:luis.aragonduarte@ucr.ac.cr <br />
            Numero Telefonico: 61781852
            <br />
            CT_Puesto : Desarrollador Web <br />
            Departamento: IT
          </IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol size="2" offset="0">
                <IonButton fill="outline" size="small" color="sumary">
                  Editar
                </IonButton>
              </IonCol>
              <IonCol size="2" offset="1">
                <IonButton fill="outline" size="small" color="danger">
                  Eliminar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Miguel Aragon Duarte</IonCardTitle>
            <IonCardSubtitle>Cedula: 701450245</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Correo:luis.aragonduarte@ucr.ac.cr <br />
            Numero Telefonico: 61781852
            <br />
            CT_Puesto : Desarrollador Web <br />
            Departamento: IT
          </IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol size="2" offset="0">
                <IonButton fill="outline" size="small" color="sumary">
                  Editar
                </IonButton>
              </IonCol>
              <IonCol size="2" offset="1">
                <IonButton fill="outline" size="small" color="danger">
                  Eliminar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Miguel Aragon Duarte</IonCardTitle>
            <IonCardSubtitle>Cedula: 701450245</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Correo:luis.aragonduarte@ucr.ac.cr <br />
            Numero Telefonico: 61781852
            <br />
            CT_Puesto : Desarrollador Web <br />
            Departamento: IT
          </IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol size="2" offset="0">
                <IonButton fill="outline" size="small" color="sumary">
                  Editar
                </IonButton>
              </IonCol>
              <IonCol size="2" offset="1">
                <IonButton fill="outline" size="small" color="danger">
                  Eliminar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
    </>
  );
}
export default Usuario;
