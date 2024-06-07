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
import { Redirect, useHistory } from "react-router";
import { c } from "vite/dist/node/types.d-aGj9QkWt";


function FormUsuario({ id, datos }: any) {
  const puerto = "http://localhost:3000";
  const history = useHistory();
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
  const [peticionError, setPeticionErro] = useState("");

  function agregarUsuario() {
    axios
      .post(`${puerto}/usuarios/crear`, {
        CT_Codigo_Usuario: cedula,
        CT_Nombre: nombre,
        CT_Usuario: correo,
        CN_Numero_Telefonico: telefono,
        CT_Puesto: puesto,
        CN_Id_Departamento: departamento,
      })
      .then(function (response) {
        console.log(response);
        modal.current?.dismiss(input.current?.value, "confirm");
      })
      .catch(function (error) {
        console.log(error);
        setPeticionErro("Error al agregar el usuario, "+ error.response.data.msg);
      });
  }

  function editarUsuario() {
    axios
    .post(`${puerto}/usuarios/editar/${cedula}`, {
      CT_Nombre: nombre,
      CT_Contraseña : contrasena,
      CT_Usuario: correo,
      CN_Numero_Telefonico: telefono,
      CT_Puesto: puesto,
      CN_Id_Departamento: departamento,
    })
    .then(function (response) {
      console.log(response);
       //history.push("/usuarios");
      // window.location.reload();
      window.location.href = "/usuarios";
       modal.current?.dismiss(input.current?.value, "confirm");
     
    })
    .catch(function (error) {
      console.log(error);
      setPeticionErro("Error al agregar el usuario, "+ error.response.data.message);
    });
  }

  function resetearEstados() {
    setCedula("");
    setNombre("");
    setTelefono("");
    setContrasena("");
    setCorreo("");
    setPuesto("");
    setDepartamento("");
    setCedulaError("");
    setNombreError("");
    setTelefonoError("");
    setContrasenaError("");
    setCorreoError("");
    setPuestoError("");
    setDepartamentoError("");
    setPeticionErro("");
  }

  function actualizarDato() {
    setCedula(datos.CT_Codigo_Usuario);
    setNombre(datos.CT_Nombre);
    setTelefono(datos.CN_Numero_Telefonico );
    setContrasena(datos.CT_Contraseña);
    setCorreo(datos.CT_Usuario);  
    setPuesto(datos.CT_Puesto);
    setDepartamento(datos.CN_Id_Departamento);
  }

  useEffect(() => {
    axios
      .get(`${puerto}/departamentos`)
      .then((response) => {
        setDepartamentos(response.data);
        actualizarDato();
      })
      .catch((error) => {
        console.error("Error al obtener la lista de estados:", error);
      });
  }, []);

  function confirm() {
    if (!datos) {
      agregarUsuario();
    } else if (datos) {
      console.log("Editando");
      editarUsuario();
      actualizarDato();
    }
   
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    resetearEstados(); // Always reset states on dismiss
  }

  if (datos) {
    return (
      <>
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
        <IonButton id={id} fill="outline" size="small" color="sumary">
          Editar
        </IonButton>
        <IonModal
          ref={modal}
          trigger={id}
          onWillDismiss={(ev) => onWillDismiss(ev)}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton
                  onClick={() => modal.current?.dismiss() }
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
                Editando Usuario
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
                  readonly={true}
                  value={cedula}
                  onIonInput={(e: any) => {
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
                  value={nombre}
                  onIonInput={(e: any) => {
                    const value = e.target.value;
                    if (value.length >= 3) {
                      console.log(value);
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
                  value={telefono}
                  onIonInput={(e: any) => {
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
                  type="email"
                  label="Correo Electronico"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder="Ingrese el Correo Electronico"
                  value={correo}
                  onIonInput={(e: any) => {
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
                  value={puesto}
                  onIonInput={(e: any) => {
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
                  value={departamento}
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
      </>
    );
  } else {
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
        <IonButton id="nuevoUsuario" size="small">
          Nuevo Usuario
        </IonButton>
        <IonModal
          ref={modal}
          trigger="nuevoUsuario"
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
                  onIonChange={(e: any) => {
                    const value = e.detail.value; // Cambio aquí para usar e.detail.value
                    if (value && value.length === 9) { // Asegurarse de que value no sea null/undefined
                      console.log(value);
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
                  onIonInput={(e: any) => {
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
                  onIonInput={(e: any) => {
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
                  onIonInput={(e: any) => {
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
                  onIonInput={(e: any) => {
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
                  onIonInput={(e: any) => {
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
                    if (value|| value == 0) {
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
              </IonRow>
              <IonText color="danger">{departamentoError}</IonText>
            </IonGrid>
            <IonText color="danger">{peticionError}</IonText>

          </IonContent>
        </IonModal>
      </IonPage>
    );
  }
}

export default FormUsuario;
