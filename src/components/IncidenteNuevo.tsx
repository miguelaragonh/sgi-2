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
import FormNuevaIncidencia from "./Formularios/FormNuevaIncidencia";
import { useAuth } from "./UserContext";


function Usuario() {
 const puerto = 'http://localhost:3000';
  const [incidentes, setIncidente] = useState([]); 
  const {user } = useAuth();
  
  useEffect(() => {
    axios
      .get(`${puerto}/incidencias/${user.usuario.CT_Codigo_Usuario}`)
      .then((response) => {
        setIncidente(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de estados:", error);
      });
  }, []);

  return (
    <>
      <IonItem style={{ justifyContent: "center", textAlign: "center" }}>
        <IonLabel>Lista Incidente-Usuario</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>
          <FormNuevaIncidencia id={user.usuario.CT_Codigo_Usuario}/>
        </IonLabel>
      </IonItem>
      {
  incidentes && incidentes.length > 0 ? (
   incidentes.map((incidente) => {
      return (
        <IonCard key={incidente.CT_Id_Incidencia}>
          <IonCardHeader>
            <IonCardTitle>{incidente.T_Incidencia.CT_Titulo}</IonCardTitle>
            <IonCardSubtitle>Codigo Incidente:{incidente.CT_Id_Incidencia}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Descripcion:{incidente.T_Incidencia.CT_Descripcion} <br />
            Lugar: {incidente.T_Incidencia.CT_Lugar}
           
          </IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol size="2" offset="0">
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
