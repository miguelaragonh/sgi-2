import React, { useEffect, useState } from "react";
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
import axios, { Axios } from "axios";
import FormUsuario from "./Formularios/FormUsuario";

function Usuario() {
 const puerto = 'http://localhost:3000';
  const [usuarios, setUsuarios] = useState([]);
 
  
  useEffect(() => {
    axios
      .get(`${puerto}/usuarios`)
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de estados:", error);
      });
  }, []);

  return (
    <>
      <IonItem style={{ justifyContent: "center", textAlign: "center" }}>
        <IonLabel>Lista de Usuarios</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>
          <FormUsuario/>
        </IonLabel>
      </IonItem>
      {
  usuarios && usuarios.length > 0 ? (
    usuarios.map((usuario) => {
      return (
        <IonCard key={usuario.CT_Codigo_Usuario}>
          <IonCardHeader>
            <IonCardTitle>{usuario.CT_Nombre}</IonCardTitle>
            <IonCardSubtitle>Cedula:{usuario.CT_Codigo_Usuario}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Correo:{usuario.CT_Usuario} <br />
            Numero Telefonico: {usuario.CN_Numero_Telefonico}
            <br />
            Puesto :{usuario.CT_Puesto} <br />
            Departamento: {usuario.T_Departamento.CT_Descripcion}
          </IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol size="2" offset="0">
              <FormUsuario id={ usuario.CT_Codigo_Usuario} datos={usuario}/>
              </IonCol>
            
            </IonRow>
          </IonGrid>
        </IonCard>
      );
    })
  ) : (
    <IonItem>
      <IonLabel>No hay usuarios</IonLabel>
    </IonItem>
  )
}
    </>
  );
}
export default Usuario;
