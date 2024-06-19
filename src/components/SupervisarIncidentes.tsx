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
import FormSupervisar from "./Formularios/FormSupervisar";
import { useAuth } from "./UserContext";
import { i } from "vite/dist/node/types.d-aGj9QkWt";

function AsignarIncidentes() {
  const puerto = "http://localhost:3000";
  const [incidentes, setIncidente] = useState([]);
  const [imagenes, setImagenes] = useState({}); // Nuevo estado para almacenar las imágenes
  const [estados, setEstados] = useState({}); // Nuevo estado para almacenar las imágenes
  const { user } = useAuth();
  const [present, dismiss] = useIonLoading();
  const [searchText, setSearchText] = useState(""); // Estado para el valor de búsqueda

  useEffect(() => {
    present({
      message: "Cargando...",
      duration: 1500,
    });
    setTimeout(() => {
    axios
      .get(`${puerto}/incidenciaregistradas/0`)
      .then((response) => {
        setIncidente(response.data);
        response.data.forEach((incidente:any) => {
          getImagen(incidente.CT_Id_Incidencia);
          getEstado(incidente.CN_Id_Estado);
        });
      })
      .catch((error) => {
        console.error("Error al obtener la lista de estados:", error);
      }).finally(() => {
        dismiss();
      });
  }, 1500);
  }, []);

  async function getImagen(img: any) {
    try {
      const response = await axios.get(`${puerto}/incidencia/imagen/${img}`);
      setImagenes((prev) => ({ ...prev, [img]: response.data }));
    } catch (error) {
      console.error("Error al obtener la imagen:", error);
    }
  }

  async function getEstado(idEstado: any) {
    try {
      const estados = await axios.get(`${puerto}/estados/${idEstado}`);
      console.log(estados.data.CT_Descripcion);
      setEstados((prev) => ({
        ...prev,
        [idEstado]: estados.data.CT_Descripcion,
      }));
    } catch (error) {
      console.error("Error al obtener la imagen:", error);
    }
  }
  const incidentesFiltrados = incidentes.filter((incidente) =>
    incidente.CT_Id_Incidencia.toString().includes(searchText)
  );

  return (
    <>
      <IonItem style={{ justifyContent: "center", textAlign: "center" }}>
        <IonLabel>Lista Incidente-Supervisor</IonLabel>
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
                Codigo Incidente:{incidente.CT_Id_Incidencia}
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              Descripcion:{incidente.CT_Descripcion} <br />
              Lugar: {incidente.CT_Lugar}
              <br />
              Estados: {estados[incidente.CN_Id_Estado]}
            </IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="2" offset="0">
                <FormSupervisar id={ incidente.CT_Id_Incidencia} datos={incidente} imagen={imagenes[incidente.CT_Id_Incidencia] } estado={estados[incidente.CN_Id_Estado]}/>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        ))
      ) : (
        <IonItem>
          <IonLabel style={{ justifyContent: "center", textAlign: "center" }}>
            Aun no tienes incidentes para evaluar
          </IonLabel>
        </IonItem>
      )}
    </>
  );
}

export default AsignarIncidentes;