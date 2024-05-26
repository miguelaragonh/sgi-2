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
  interface Usuario {
    Nombre: string;
    Cedula: string;
    Correo: string;
    Numero: string;
    Puesto: string;
    Departamento: string;
  }

  const Usuarios: Usuario[] = [
    {
      Nombre: "Miguel Aragon Duarte",
      Cedula: "701450245",
      Correo: "luis.aragonduarte@ucr.ac.cr",
      Numero: "61781852",
      Puesto: "Desarrollador Web",
      Departamento: "IT",
    },{
      Nombre: "Miguel Aragon Duarte",
      Cedula: "701450245",
      Correo: "luis.aragonduarte@ucr.ac.cr",
      Numero: "61781852",
      Puesto: "Desarrollador Web",
      Departamento: "IT",
    },{
      Nombre: "Miguel Aragon Duarte",
      Cedula: "701450245",
      Correo: "luis.aragonduarte@ucr.ac.cr",
      Numero: "61781852",
      Puesto: "Desarrollador Web",
      Departamento: "IT",
    },
  ];
  return (
    <>
      <IonItem style={{ justifyContent: "center", textAlign: "center" }}>
        <IonLabel>Lista de Usuarios</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>
          <Modal />
        </IonLabel>
      </IonItem>
      {Usuarios.map((Usuario,index)=>{return(
      <IonCard key={index}>
        <IonCardHeader>
          <IonCardTitle>{Usuario.Nombre}</IonCardTitle>
          <IonCardSubtitle>Cedula:{Usuario.Cedula}</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          Correo:{Usuario.Correo} <br />
          Numero Telefonico: {Usuario.Numero}
          <br />
          Puesto :{Usuario.Puesto} <br />
          Departamento: {Usuario.Departamento}
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
      </IonCard>)})}
    </>
  );
}
export default Usuario;
