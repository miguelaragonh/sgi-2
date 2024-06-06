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
  IonSelect,
  IonSelectOption,
  IonText,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import axios from "axios";

function Modal({ childComponent }: any) {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [cedula, setCedula] = useState();
  const [nombre, setNombre] = useState();
  const [telefono, setTelefono] = useState();
  const [contrasena, setContrasena] = useState();
  const [correo, setCorreo] = useState();
  const [puesto, setPuesto] = useState();
  const [departamento, setDepartamento] = useState();
  const [departamentos, setDepartamentos] = useState();

  const [cedulaError, setCedulaError] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [contrasenaError, setContrasenaError] = useState("");
  const [correoError, setCorreoError] = useState("");
  const [puestoError, setPuestoError] = useState("");
  const [departamentoError, setDepartamentoError] = useState("");

  function print() {
    console.log(cedula);
    console.log(nombre);
    console.log(telefono);
    console.log(contrasena);
    console.log(correo);
    console.log(puesto);
    console.log(departamento);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3000/departamentos`)
      .then((response) => {
        setDepartamentos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de estados:", error);
      });
  }, []);

  function confirm() {
    print();
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      console.log("confirm");
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
      <IonButton id="open-modal" size="small">
        Nuevo Usuario
      </IonButton>
      <IonModal
        ref={modal}
        trigger="open-modal"
        onWillDismiss={(ev) => onWillDismiss(ev)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                onClick={() => modal.current?.dismiss()}
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
              Nuevo Usuario
            </IonTitle>
            <IonButtons slot="end">
              <IonButton
                strong={true}
                onClick={() => confirm()}
                color="primary"
                fill="clear"
                disabled={
                  !cedula ||
                  !nombre ||
                  !telefono ||
                  !contrasena ||
                  !correo ||
                  !puesto ||
                  !departamento
                }
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
                label="Cedula"
                labelPlacement="floating"
                fill="outline"
                placeholder="Ingrese el numero de cedula"
                onInput={(e: any) => {
                  const value = e.target.value;
                  if (value.length === 9) {
                    setCedula(value);
                    setCedulaError("");
                  } else {
                    setCedulaError("La cedula debe tener 9 caracteres");
                  }
                }}
              />
              <IonText color="danger">{cedulaError}</IonText>
            </IonRow>
            <br />
            <IonRow>
              <IonInput
                type="text"
                label="Nombre Completo"
                labelPlacement="floating"
                fill="outline"
                placeholder="Ingrese el nombre completo"
                onInput={(e: any) => {
                  const value = e.target.value;
                  if (value.length >= 3) {
                    setNombre(value);
                    setNombreError("");
                  } else {
                    setNombreError(
                      "El nombre debe tener al menos 3 caracteres"
                    );
                  }
                }}
              />
              <IonText color="danger">{nombreError}</IonText>
            </IonRow>
            <br />
            <IonRow>
              <IonInput
                type="number"
                label="Numero Celular"
                labelPlacement="floating"
                fill="outline"
                placeholder="Ingrese el numero Celular"
                onInput={(e: any) => {
                  const value = e.target.value;
                  if (value.length === 8) {
                    setTelefono(value);
                    setTelefonoError("");
                  } else {
                    setTelefonoError(
                      "El numero de celular debe tener 8 caracteres"
                    );
                  }
                }}
              />
              <IonText color="danger">{telefonoError}</IonText>
            </IonRow>
            <br />
            <IonRow>
              <IonInput
                type="password"
                label="Contrasena"
                labelPlacement="floating"
                fill="outline"
                placeholder="Ingrese la contrasena"
                onInput={(e: any) => {
                  const value = e.target.value;
                  if (value.length >= 8) {
                    setContrasena(value);
                    setContrasenaError("");
                  } else {
                    setContrasenaError(
                      "La contrasena debe tener al menos 8 caracteres"
                    );
                  }
                }}
              />
              <IonText color="danger">{contrasenaError}</IonText>
            </IonRow>
            <br />
            <IonRow>
              <IonInput
                type="email"
                label="Correo Electronico"
                labelPlacement="floating"
                fill="outline"
                placeholder="Ingrese el Correo Electronico"
                onInput={(e: any) => {
                  const value = e.target.value;
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (emailRegex.test(value)) {
                    setCorreo(value);
                    setCorreoError("");
                  } else {
                    setCorreoError(
                      "Por favor, introduce un correo electronico valido"
                    );
                  }
                }}
              />
              <IonText color="danger">{correoError}</IonText>
            </IonRow>
            <br />
            <IonRow>
              <IonInput
                type="text"
                label="Puesto"
                labelPlacement="floating"
                fill="outline"
                placeholder="Ingrese el puesto del usuario"
                onInput={(e: any) => {
                  const value = e.target.value;
                  if (value.length >= 8) {
                    setPuesto(value);
                    setPuestoError("");
                  } else {
                    setPuestoError(
                      "El puesto debe tener al menos 8 caracteres"
                    );
                  }
                }}
              />
              <IonText color="danger">{puestoError}</IonText>
            </IonRow>
            <br />
            <IonRow>
              <IonSelect
                label="Departamentos"
                placeholder="Selecciona el departamento"
                fill="outline"
                labelPlacement="floating"
                onIonChange={(e: any) => {
                  const value = e.target.value;
                  if (value) {
                    setDepartamento(value);
                    setDepartamentoError("");
                  } else {
                    setDepartamentoError(
                      "Por favor, selecciona un departamento"
                    );
                  }
                }}
              >
                {departamentos ? (
                  departamentos.map((depas): any => {
                    return (
                      <IonSelectOption
                        key={depas.CN_Id_Departamento}
                        value={depas.CN_Id_Departamento}
                      >
                        {depas.CT_Descripcion}
                      </IonSelectOption>
                    );
                  })
                ) : (
                  <IonSelectOption value="0">Desconocido</IonSelectOption>
                )}
              </IonSelect>
              <IonText color="danger">{departamentoError}</IonText>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>
    </IonPage>
  );
}

export default Modal;
