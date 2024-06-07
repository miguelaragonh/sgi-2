import React, { useState, useRef, useEffect } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonInput,
  IonRow,
  IonGrid,
  IonText,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import { useHistory } from "react-router";
import axios from "axios";

function FormNuevaIncidencia({ id }: any) {
  const puerto = "http://localhost:3000";
  const history = useHistory();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [lugar, setLugar] = useState("");
  const [base64, setBase64] = useState("");

  const [tituloError, setTituloError] = useState("");
  const [descripcionError, setDescripcionError] = useState("");
  const [lugarError, setLugarError] = useState("");
  const [base64Error, setBase64Error] = useState("");
  const [peticionError, setPeticionError] = useState("");

  const resetForm = () => {
    setTitulo("");
    setDescripcion("");
    setTituloError("");
    setDescripcionError("");
    setPeticionError("");
    setBase64Error("");
  };

  function crearIncidencia() {
    axios
      .post(`${puerto}/incidencia/crear`, {
        CT_Titulo: titulo,
        CT_Descripcion: descripcion,
        CT_Lugar: lugar,
        Usuario: id,
        img: base64
      })
      .then(function (response) {
        console.log(response);
        modal.current?.dismiss(input.current?.value, "confirm");
      })
      .catch(function (error) {
        console.log(error);
        setPeticionError(
          "Error al agregar el usuario, " + error.response.data.msg
        );
      });
  }
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result);
      };
      reader.onerror = () => {
        setBase64Error("Error reading file");
      };
      reader.readAsDataURL(file);
      console.log(base64);
    } else {
      setBase64Error("No file selected");
    }
  };

  function confirm() {
    crearIncidencia();
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      console.log("confirm");
    } else {
      resetForm();
    }
  }

  return (
    <IonPage>
      <style>
        {`
        input[type='number']::-webkit-inner-spin-button,
        input[type='number']::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}
      </style>
      <IonButton id="nuevoIncidente" size="small">
        Nueva Incidencia
      </IonButton>
      <IonModal
        ref={modal}
        trigger="nuevoIncidente"
        onWillDismiss={(ev) => onWillDismiss(ev)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                onClick={() => {
                  modal.current?.dismiss();
                  resetForm();
                }}
                color="danger"
                fill="clear"
              >
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle
              style={{
                justifyContent: "center",
                textAlign: "center",
                color: "black",
              }}
            >
              Crear Incidencia
            </IonTitle>
            <IonButtons slot="end">
              <IonButton
                strong={true}
                onClick={() => confirm()}
                color="primary"
                fill="clear"
                disabled={!titulo || !descripcion}
              >
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonInput
                type="text"
                label="Titulo"
                labelPlacement="floating"
                fill="outline"
                placeholder="Ingrese el Titulo"
                value={titulo}
                onIonInput={(e: any) => {
                  const value = e.target.value;
                  if (value.length > 9) {
                    setTitulo(value);
                    setTituloError("");
                  } else {
                    setTituloError("El titulo debe tener 9 caracteres");
                  }
                }}
              />
              <IonText color="danger">{tituloError}</IonText>
            </IonRow>
            <br />
            <IonRow>
              <IonInput
                type="text"
                label="Descripcion"
                labelPlacement="floating"
                fill="outline"
                placeholder="Ingrese la Descripcion"
                value={descripcion}
                onIonInput={(e: any) => {
                  const value = e.target.value;
                  if (value.length > 9) {
                    setDescripcion(value);
                    setDescripcionError("");
                  } else {
                    setDescripcionError(
                      "La descripcion debe tener 9 caracteres"
                    );
                  }
                }}
              />
              <IonText color="danger">{descripcionError}</IonText>
            </IonRow>
            <br />

            <IonRow>
              <IonInput
                type="text"
                label="Lugar"
                labelPlacement="floating"
                fill="outline"
                placeholder="Ingrese el lugar de la incidencia"
                value={lugar}
                onIonInput={(e: any) => {
                  const value = e.target.value;
                  if (value.length > 9) {
                    setLugar(value);
                    setLugarError("");
                  } else {
                    setLugarError("La Lugar debe tener 9 caracteres");
                  }
                }}
              />
              <IonText color="danger">{lugarError}</IonText>
            </IonRow>
            <br />

            <IonRow>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <IonText color="danger">{base64Error}</IonText>
            </IonRow>
            <br />
          </IonGrid>
          <IonText color="danger">{peticionError}</IonText>
        </IonContent>
      </IonModal>
    </IonPage>
  );
}

export default FormNuevaIncidencia;
