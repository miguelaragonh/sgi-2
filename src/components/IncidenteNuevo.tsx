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
  IonSearchbar,
  useIonLoading,
} from "@ionic/react";
import axios from "axios";
import FormNuevaIncidencia from "./Formularios/FormNuevaIncidencia";
import { useAuth } from "./UserContext";

function IncidenteNuevo() {
  const puerto = "https://sgi-b2-production.up.railway.app";
  const [incidentes, setIncidente] = useState([]);
  const [imagenes, setImagenes] = useState({}); // Estado para almacenar las imágenes
  const [estados, setEstados] = useState({}); // Estado para almacenar los estados
  const [searchText, setSearchText] = useState(""); // Estado para el valor de búsqueda
  const { user, click} = useAuth();
  const [present, dismiss] = useIonLoading();
  useEffect(() => {
    setIncidente([]);
    present({
      message: "Cargando...",
      duration: 1500,
    });
    setTimeout(() => {
      axios
        .get(`${puerto}/incidencias/${user.usuario.CT_Codigo_Usuario}`)
        .then((response) => {
          setIncidente(response.data);
          response.data.forEach((incidente) => {
            getImagen(incidente.CT_Id_Incidencia);
            getEstado(incidente.CN_Id_Estado);
          });
        })
        .catch((error) => {
          console.error("Error al obtener la lista de incidentes:", error);
        })
        .finally(() => {
          dismiss();
        });
    }, 1500);
  }, [click]);

  async function getImagen(img) {
    try {
      const response = await axios.get(`${puerto}/incidencia/imagen/${img}`);
      setImagenes((prev) => ({ ...prev, [img]: response.data }));
    } catch (error) {
      console.error("Error al obtener la imagen:", error);
    }
  }

  async function getEstado(idEstado) {
    try {
      const estados = await axios.get(`${puerto}/estados/${idEstado}`);
      setEstados((prev) => ({
        ...prev,
        [idEstado]: estados.data.CT_Descripcion,
      }));
    } catch (error) {
      console.error("Error al obtener el estado:", error);
    }
  }

  const incidentesFiltrados = incidentes.filter((incidente) =>
    incidente.CT_Id_Incidencia.toString().includes(searchText)
  );

  return (
    <>
      <IonItem
        style={{
          justifyContent: "center",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <IonLabel>Lista Incidente-Usuario</IonLabel>
      </IonItem>
      <IonItem
        style={{
          justifyContent: "center",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <IonSearchbar
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value)}
        />
      </IonItem>
      <IonItem>
        <IonLabel>
          <FormNuevaIncidencia id={user.usuario.CT_Codigo_Usuario} />
        </IonLabel>
      </IonItem>
      {incidentesFiltrados && incidentesFiltrados.length > 0 ? (
        incidentesFiltrados.map((incidente) => (
          <IonCard key={incidente.CT_Id_Incidencia}>
            <img
              alt={incidente.CT_Descripcion}
              src={imagenes[incidente.CT_Id_Incidencia]}
            />
            <IonCardHeader>
              <IonCardTitle>{incidente.CT_Titulo}</IonCardTitle>
              <IonCardSubtitle>
                Codigo Incidente: {incidente.CT_Id_Incidencia}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              Descripcion: {incidente.CT_Descripcion} <br />
              Lugar: {incidente.CT_Lugar}
              <br />
              Estado: {estados[incidente.CN_Id_Estado]}
            </IonCardContent>
          </IonCard>
        ))
      ) : (
        <IonItem>
          <IonLabel style={{ justifyContent: "center", textAlign: "center" }}>
            No se encontraron incidentes agregados
          </IonLabel>
        </IonItem>
      )}
    </>
  );
}

export default IncidenteNuevo;
