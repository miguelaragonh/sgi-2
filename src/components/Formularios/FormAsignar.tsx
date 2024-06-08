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
import { c, l } from "vite/dist/node/types.d-aGj9QkWt";

function FormUsuario({ id, datos, imagen, estado }: any) {
  const puerto = "http://localhost:3000";
  const history = useHistory();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [CodigoIncidente, setCodigoIncidente] = useState();
  const [Descripcion, setDescripcion] = useState();
  const [Lugar, setLugar] = useState();
  const [Titulo, setTitulo] = useState();
  const [Costos, setCostos] = useState();
  const [Duracion, setDuracion] = useState();

  const [Categoria, setCategoria] = useState();
  const [Categorias, setCategorias] = useState();

  const [Prioridad, setPrioridad] = useState();
  const [Prioridades, setPrioridades] = useState();

  const [Riesgo, setRiesgo] = useState();
  const [Riesgos, setRiesgos] = useState();

  const [Afectacion, setAfectacion] = useState();
  const [Afectaciones, setAfectaciones] = useState();

  const [Tecnico, setTecnico] = useState();
  const [Tecnicos, setTecnicos] = useState();

  const [CategoriaError, setCategoriaError] = useState("");
  const [CostoError, setCostoError] = useState("");
  const [DuracionError, setDuracionError] = useState("");
  const [PrioridadError, setPrioridadError] = useState("");
  const [RiesgoError, setRiesgoError] = useState("");
  const [AfectacionError, setAfectacionError] = useState("");
  const [TecnicoError, setTecnicoError] = useState("");
  const [peticionError, setPeticionErro] = useState("");

  function asignarIncidente() {
   axios
      .put(`${puerto}/incidencia/editar/${CodigoIncidente}`, {
        CN_Costos: Costos,
        CN_Duracion: Duracion,
        CN_Id_Prioridad: Prioridad,
        CN_Id_Riesgo: Riesgo,
        CN_Id_Afectacion: Afectacion,
        CN_Id_Categoria: Categoria,
        CN_Id_Estado: 2,
      })
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (error) {
        console.log(error);
        setPeticionErro(
          "Error al agregar el usuario, " + error.response.data.msg
        );
      });
    axios
      .post(`${puerto}/incidencia/asignar/${CodigoIncidente}`, {
        CT_Codigo_Usuario: Tecnico,
      })
      .then(function (response) {
        console.log(response);
        modal.current?.dismiss(input.current?.value, "confirm");
        window.location.href = "/home";
      })
      .catch(function (error) {
        console.log(error);
        setPeticionErro(
          "Error al agregar el usuario, " + error.response.data.msg
        );
      });
    /* window.location.href = "/home";
    console.log("Editando");
    console.log(CodigoIncidente);
    console.log(Costos);
    console.log(Duracion);
    console.log(Categoria);
    console.log(Prioridad);
    console.log(Riesgo);
    console.log(Afectacion);
    console.log(Tecnico);*/
  }

  function resetearEstados() {
    setCostos("");
    setCategoriaError("");
    setCostoError("");
    setPeticionErro("");
    setDuracion("");
    setDuracionError("");
    setCategoria("");
    setPrioridad("");
    setPrioridadError("");
    setRiesgo("");
    setRiesgoError("");
    setAfectacion("");
    setAfectacionError("");
    setTecnico("");
    setTecnicoError("");
  }

  function actualizarDato() {
    setCodigoIncidente(datos.CT_Id_Incidencia);
    setDescripcion(datos.CT_Descripcion);
    setLugar(datos.CT_Lugar);
    setTitulo(datos.CT_Titulo);
    setCategoria(datos.CN_Id_Categoria);
  }

  useEffect(() => {
    axios
      .get(`${puerto}/categorias`)
      .then((response) => {
        setCategorias(response.data);
        actualizarDato();
      })
      .catch((error) => {
        console.error("Error al obtener la lista de estados:", error);
      });

    axios
      .get(`${puerto}/prioridades`)
      .then((response) => {
        setPrioridades(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de estados:", error);
      });

    axios
      .get(`${puerto}/riesgos`)
      .then((response) => {
        setRiesgos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de estados:", error);
      });

    axios
      .get(`${puerto}/afectaciones`)
      .then((response) => {
        setAfectaciones(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de estados:", error);
      });

    axios
      .get(`${puerto}/tecnicos`)
      .then((response) => {
        setTecnicos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de estados:", error);
      });
  }, []);

  function confirm() {
    console.log("Editando");
    asignarIncidente();
    actualizarDato();
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
          Asignar
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
                Asignar Incidente
              </IonTitle>
              <IonButtons slot="end">
                <IonButton
                  strong={true}
                  onClick={() => confirm()}
                  color="primary"
                  fill="clear"
                  disabled={
                    !Costos ||
                    !Duracion ||
                    !Categoria ||
                    !Prioridad ||
                    !Riesgo ||
                    !Afectacion ||
                    !Tecnico
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
                  label="CodigoIncidente"
                  labelPlacement="floating"
                  fill="outline"
                  readonly={true}
                  value={CodigoIncidente}
                />
              </IonRow>
              <br />

              <IonRow>
                <IonInput
                  type="text"
                  label="Titulo"
                  labelPlacement="floating"
                  fill="outline"
                  readonly={true}
                  value={Titulo}
                />
              </IonRow>
              <br />
              <IonRow>
                <IonInput
                  type="text"
                  label="Descripcion Completo"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder="Ingrese el Descripcion completo"
                  value={Descripcion}
                  readonly={true}
                />
              </IonRow>
              <br />
              <IonRow>
                <IonInput
                  type="text"
                  label="Lugar"
                  labelPlacement="floating"
                  fill="outline"
                  value={Lugar}
                  readonly={true}
                />
              </IonRow>
              <br />
              <IonRow>
                <IonInput
                  type="text"
                  label="Estado"
                  labelPlacement="floating"
                  fill="outline"
                  value={estado}
                  readonly={true}
                />
              </IonRow>
              <br />
              <IonRow>
                <IonInput
                  type="number"
                  label="Costos"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder="Ingrese el costo del incidente"
                  onIonFocus={() => {
                    if (!Costos) {
                      // Asume que 'costos' es el estado que almacena el valor actual del input
                      setCostoError("Por favor, ingrese un costo ");
                    }
                  }}
                  onIonInput={(e: any) => {
                    // Cambiado de onIonInput a onIonChange
                    const value = e.detail.value; // Cambiado de e.target.value a e.detail.value
                    if (!value) {
                      // Asegurarse de que value no sea null/undefined
                      setCostoError("Por favor, ingrese un costo");
                    } else {
                      setCostos(value);
                      setCostoError("");
                    }
                  }}
                />
                <IonText color="danger">{CostoError}</IonText>{" "}
                {/* Mostrar el mensaje de error aquí */}
              </IonRow>

              <br />
              <IonRow>
                <IonInput
                  type="number"
                  label="Duracion Horas"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder="Ingrese la duracion del incidente"
                  onIonFocus={() => {
                    if (!Duracion) {
                      // Asume que 'costos' es el estado que almacena el valor actual del input
                      setDuracionError("Por favor, ingrese una duracion");
                    }
                  }}
                  onIonInput={(e: any) => {
                    // Cambiado de onIonInput a onIonChange
                    const value = e.detail.value; // Cambiado de e.target.value a e.detail.value
                    if (!value) {
                      // Asegurarse de que value no sea null/undefined
                      setDuracionError("Por favor, ingrese un costo válido.");
                    } else {
                      setDuracion(value);
                      setDuracionError("");
                    }
                  }}
                />
                <IonText color="danger">{DuracionError}</IonText>{" "}
                {/* Mostrar el mensaje de error aquí */}
              </IonRow>
              <br />
              <IonRow>
                <IonSelect
                  label="Categoria"
                  fill="outline"
                  labelPlacement="floating"
                  value={Categoria}
                  placeholder="Seleccione una Categoria"
                  onIonChange={(e: any) => {
                    const value = e.target.value;
                    if (value) {
                      setCategoria(value);
                      setCategoriaError("");
                    } else {
                      setCategoriaError("Por favor, selecciona un Categoria");
                    }
                  }}
                >
                  {Categorias ? (
                    Categorias.map((categoria): any => {
                      return (
                        <IonSelectOption
                          key={categoria.CN_Id_Categoria}
                          value={categoria.CN_Id_Categoria}
                        >
                          {categoria.CT_Descripcion}
                        </IonSelectOption>
                      );
                    })
                  ) : (
                    <IonSelectOption value="0">Desconocido</IonSelectOption>
                  )}
                </IonSelect>
                <IonText color="danger">{CategoriaError}</IonText>
              </IonRow>

              <br />
              <IonRow>
                <IonSelect
                  label="Prioridad"
                  fill="outline"
                  labelPlacement="floating"
                  value={Prioridad}
                  onIonChange={(e: any) => {
                    const value = e.target.value;
                    if (value) {
                      setPrioridad(value);
                      setPrioridadError("");
                    } else {
                      setPrioridadError("Por favor, selecciona una Prioridad");
                    }
                  }}
                >
                  {Prioridades ? (
                    Prioridades.map((Prioridad): any => {
                      return (
                        <IonSelectOption
                          key={Prioridad.CN_Id_Prioridad}
                          value={Prioridad.CN_Id_Prioridad}
                        >
                          {Prioridad.CT_Descripcion}
                        </IonSelectOption>
                      );
                    })
                  ) : (
                    <IonSelectOption value="0">Desconocido</IonSelectOption>
                  )}
                </IonSelect>
                <IonText color="danger">{PrioridadError}</IonText>
              </IonRow>

              <br />
              <IonRow>
                <IonSelect
                  label="Riesgo"
                  fill="outline"
                  labelPlacement="floating"
                  value={Riesgo}
                  onIonChange={(e: any) => {
                    const value = e.target.value;
                    if (value) {
                      setRiesgo(value);
                      setRiesgoError("");
                    } else {
                      setRiesgoError("Por favor, selecciona un Riesgo");
                    }
                  }}
                >
                  {Riesgos ? (
                    Riesgos.map((Riesgo): any => {
                      return (
                        <IonSelectOption
                          key={Riesgo.CN_Id_Riesgo}
                          value={Riesgo.CN_Id_Riesgo}
                        >
                          {Riesgo.CT_Descripcion}
                        </IonSelectOption>
                      );
                    })
                  ) : (
                    <IonSelectOption value="0">Desconocido</IonSelectOption>
                  )}
                </IonSelect>
                <IonText color="danger">{RiesgoError}</IonText>
              </IonRow>

              <br />
              <IonRow>
                <IonSelect
                  label="Afectacion"
                  fill="outline"
                  labelPlacement="floating"
                  value={Afectacion}
                  onIonChange={(e: any) => {
                    const value = e.target.value;
                    if (value) {
                      setAfectacion(value);
                      setAfectacionError("");
                    } else {
                      setAfectacionError(
                        "Por favor, selecciona una Afectacion"
                      );
                    }
                  }}
                >
                  {Afectaciones ? (
                    Afectaciones.map((Afectacion): any => {
                      return (
                        <IonSelectOption
                          key={Afectacion.CN_Id_Afectacion}
                          value={Afectacion.CN_Id_Afectacion}
                        >
                          {Afectacion.CT_Descripcion}
                        </IonSelectOption>
                      );
                    })
                  ) : (
                    <IonSelectOption value="0">Desconocido</IonSelectOption>
                  )}
                </IonSelect>
                <IonText color="danger">{AfectacionError}</IonText>
              </IonRow>

              <br />
              <IonRow>
                <IonSelect
                  label="Tecnico"
                  fill="outline"
                  labelPlacement="floating"
                  value={Tecnico}
                  onIonChange={(e: any) => {
                    const value = e.target.value;
                    if (value) {
                      setTecnico(value);
                      setTecnicoError("");
                    } else {
                      setTecnicoError("Por favor, seleccione un Tecnico");
                    }
                  }}
                >
                  {Tecnicos ? (
                    Tecnicos.map((Tecnico): any => {
                      return (
                        <IonSelectOption
                          key={Tecnico.CN_Id}
                          value={Tecnico.CT_Codigo_Usuario}
                        >
                          {Tecnico.Usuario}
                        </IonSelectOption>
                      );
                    })
                  ) : (
                    <IonSelectOption value="0">Desconocido</IonSelectOption>
                  )}
                </IonSelect>
                <IonText color="danger">{TecnicoError}</IonText>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
      </>
    );
  }
}

export default FormUsuario;
