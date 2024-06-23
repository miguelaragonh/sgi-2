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
  useIonLoading,
} from "@ionic/react";
import axios, { Axios } from "axios";
import FormUsuario from "./Formularios/FormUsuario";
import SelectRol from "./Formularios/SelectRol";
import FromContrasena from "./Formularios/FormContrasena";
import { c } from "vite/dist/node/types.d-aGj9QkWt";
import { useAuth } from "./UserContext";

export default function ReportesCargaTrabajo() {
  const puerto = "http://localhost:3000";
  const [usuarios, setUsuarios] = useState([]);
  const [n, setN] = useState(0);
  const [present, dismiss] = useIonLoading();
  const [Cantidad, setCantidad] = useState({}); 
  const { click } = useAuth();
  const [Cantidad2, setCantidad2] = useState({}); 
  useEffect(() => {
    setUsuarios([]);
    present({
      message: "Cargando...",
      duration: 1500,
    });
    setTimeout(() => {
      axios
        .get(`${puerto}/tecnicos`)
        .then((response) => {
          setUsuarios(response.data);
          //mapear la response.data para obtener el codigo de usuario
          response.data.forEach((code) => {
            getCantidad1(code.CT_Codigo_Usuario);
            getCantidad2(code.CT_Codigo_Usuario);
            
          });
          //getCantidad(response.data.CT_Codigo_Usuario);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de estados:", error);
        })
        .finally(() => {
          dismiss();
        });

        
    }, 1500);
  }, [click]);
  async function getCantidad1(code:any) {try {
      const estados = await axios.get(`${puerto}/reportes1/${code}/1`).then((response) => {
         setCantidad((prev) => ({
        ...prev,
        [code]: response.data[0] ? response.data[0].CN_Cantidad_Incidencias:0
      }));
      })
      
    
    } catch (error) {
      console.error("Error al obtener el estado:", error);
    }
  }

  async function getCantidad2(code:any) {
    try {
      const estados = await axios.get(`${puerto}/reportes1/${code}/2`).then((response) => {
         setCantidad2((prev) => ({
        ...prev,
        [code]: response.data[0] ? response.data[0].CN_Cantidad_Incidencias:0
      }));
      })
    
    } catch (error) {
      console.error("Error al obtener el estado:", error);
    }
  }
  const pendientes = (usuario:any, estado:any) => {
    console.log(usuario, estado);
 axios
  .get(`${puerto}/reportes1/504190962/1`)
    .then((response) => {
      return response.data.CN_Cantidad_Incidencias;
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error al obtener la lista de estados:", error);
    })
  };
  return (
    <>
      <IonItem style={{ justifyContent: "center", textAlign: "center" }}>
        <IonLabel>Cargas de trabajo-incidentes</IonLabel>
      </IonItem>
      {
       usuarios && usuarios.length > 0 ? (
        usuarios.map((usuario) => {
          return (
        <IonCard key={usuario.CT_Codigo_Usuario}>
          <IonCardHeader style={{ textAlign: "center" }}>
            <IonCardTitle>{usuario.Usuario}</IonCardTitle>
            <IonCardSubtitle>Cedula:{usuario.CT_Codigo_Usuario}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
          <IonRow
  style={{
    fontWeight: "bold",
    textAlign: "center",
    borderBottom: "1px solid black",
  }}
>
  <IonCol style={{ border: "1px solid black" }}>
    Pendientes
  </IonCol>
  <IonCol style={{ border: "1px solid black", borderLeft: "none" }}>
    Terminadas
  </IonCol>
</IonRow>
<IonRow
  style={{ textAlign: "center", borderBottom: "1px solid black" }}
>
  <IonCol style={{ border: "1px solid black" }}>
    {Cantidad[usuario.CT_Codigo_Usuario]}
  </IonCol>
  <IonCol style={{ border: "1px solid black", borderLeft: "none" }}>
  {Cantidad2[usuario.CT_Codigo_Usuario]}
  </IonCol>
</IonRow>
          </IonCardContent>
        </IonCard>
        );
        })
      ) : (
        <IonItem>
          <IonLabel style={{ justifyContent: "center", textAlign: "center" }}>
            No hay cargas de trabajo
          </IonLabel>
        </IonItem>
      )
      }
    </>
  );
}
