import React, { useState, useRef } from "react";
import {
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonGrid,
  IonRow,
  IonInput,
  IonText,
  IonCol,
  IonToast,
} from "@ionic/react";
import { personCircle } from "ionicons/icons";

import "../../style/main.css";
import axios from "axios";

export default function FromContrasena({ id }: any) {
  const [showModal, setShowModal] = useState(false);
  const [contrasena, setContrasena] = useState(false);
  const [ContrasenaError, setContrasenaError] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const puerto = "https://sgi-b2-production.up.railway.app";
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  function dismiss() {
    setContrasenaError("");
    setToastMessage("");
    setShowToast(false);
    modal.current?.dismiss();
  }
  function cambiarContrasena() {
    console.log(contrasena);
    axios
      .put(`${puerto}/usuarios/contrasena/${id}`, { CT_Contraseña: contrasena })
      .then((response) => {
        console.log(response);
        setToastMessage("Contraseña cambiada correctamente");
        setShowToast(true);
        setTimeout(() => {
          dismiss();
        }, 1500);
      })
      .catch((error) => {
        console.error("Error al cambiar la contraseña:", error);
      });
  }

  return (
    <>
      <IonButton
        id={id}
        fill="outline"
        size="small"
        color="danger"
        onClick={() => setShowModal(true)}
      >
        Contraseña
      </IonButton>
      <IonModal
        id="example-modal"
        ref={modal}
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
        backdropDismiss={false} // Impide cerrar el modal al hacer clic fuera
      >
        <div className="wrapper">
          <h4 style={{ textAlign: "center" }}>Cambiar Contraseña</h4>

          <IonGrid>
            <IonRow>
              <IonInput
                type="password"
                label="Nueva Contraseña"
                labelPlacement="floating"
                fill="outline"
                placeholder="Ingrese su nueva contraseña"
                readonly={false}
                onIonInput={(e: any) => {
                  const value = e.target.value;
                  if (value.length >= 8) {
                    setContrasena(value);
                    setContrasenaError("");
                  } else {
                    setContrasenaError("Debe tener 8 caracteres");
                  }
                }} /**/
              />
              <IonText color="danger">{ContrasenaError}</IonText>
            </IonRow>
            <IonRow>
              <IonCol size="2" offset="0">
                <IonButton
                  id={`${id}-cancel`}
                  fill="outline"
                  size="small"
                  color="danger"
                  onClick={dismiss} // Cierra el modal al hacer clic en Cancelar
                >
                  Cancelar
                </IonButton>
              </IonCol>
              <IonCol size="2" offset="4">
                <IonButton
                  id={`${id}-change`}
                  fill="outline"
                  size="small"
                  onClick={cambiarContrasena}
                  disabled={ContrasenaError != "" || !contrasena} // Cierra el modal al hacer clic en Cambiar
                >
                  Cambiar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
        <IonToast
          trigger="headerAnchor"
          position="bottom"
          positionAnchor="header"
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={1500}
        />
      </IonModal>
    </>
  );
}
