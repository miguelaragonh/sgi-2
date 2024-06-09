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

function FormUsuario({ id, idUsuario, datos, imagen, estado }: any) {
  const puerto = "http://localhost:3000";
  const history = useHistory();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [CodigoIncidente, setCodigoIncidente] = useState();
  const [Descripcion, setDescripcion] = useState();
  const [CT_Descripcion, setCT_Descripcion] = useState();
  const [CN_Tiempo_Solucion, setCN_Tiempo_Solucion] = useState();
  const [CT_Compra, setCT_Compra] = useState();

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
  const [DescripcionError, setDescripcionError] = useState("");
  const [TiempoSolucionError, setTSolucionError] = useState("");
  const [CompraError, setCompraError] = useState("");
  const [setTiempoSolucionError, setsetTiempoSolucionError] = useState("");
  const [peticionError, setPeticionErro] = useState("");

  function diagnosticarIncidente() {
    console.log("Diagnosticando");
    console.log(CT_Descripcion);
    console.log(CN_Tiempo_Solucion);
    console.log(CodigoIncidente);
    console.log(idUsuario);
    console.log(CT_Compra);
    axios
      .post(`${puerto}/incidencia/crear/diagnostico`, {
        CT_Descripcion: CT_Descripcion,
        CN_Tiempo_Solucion: CN_Tiempo_Solucion,
        Incidencia: CodigoIncidente,
        Usuario: idUsuario,
        CT_Compra: CT_Compra,
      })
      .then((response) => {
        console.log(response);
        modal.current?.dismiss(input.current?.value, "confirm");
        window.location.href = "/home";
      })
      .catch((error) => {
        console.error("Error al obtener la lista de estados:", error);
        setPeticionErro(
          "Error al agregar el usuario, " + error.response.data.msg
        );
      });
  }

  function resetearEstados() {
    setDescripcionError("");
    setTSolucionError("");
    setCompraError("");
    setPeticionErro("");
  }

  function actualizarDato() {
    setCodigoIncidente(datos.CT_Id_Incidencia);
    setDescripcion(datos.CT_Descripcion);
    setLugar(datos.CT_Lugar);
    setTitulo(datos.CT_Titulo);
    setCategoria(datos.CN_Id_Categoria);
    setPrioridad(datos.CN_Id_Prioridad);
    setRiesgo(datos.CN_Id_Riesgo);
    setAfectacion(datos.CN_Id_Afectacion);
    setTecnico(idUsuario);
    setCostos(datos.CN_Costos);
    setDuracion(datos.CN_Duracion);
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
    diagnosticarIncidente();
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
        {estado=="Registrado" && ( 
        <IonButton id={id} fill="outline" size="small" color="sumary">
          Diagnosticar
        </IonButton> )}
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
                Diagnosticar
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
                    !Tecnico ||
                    !CT_Descripcion ||
                    !CN_Tiempo_Solucion ||
                    !CT_Compra
                  }
                >
                  Terminar
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
                  value={Costos}
                  readonly={true}
                />
              </IonRow>

              <br />
              <IonRow>
                <IonInput
                  type="number"
                  label="Duracion Horas"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder="Ingrese la duracion del incidente"
                  value={Duracion}
                  readonly={true}
                />
              </IonRow>
              <br />
              <IonRow>
                <IonSelect
                  label="Categoria"
                  fill="outline"
                  labelPlacement="floating"
                  value={Categoria}
                  placeholder="Seleccione una Categoria"
                  disabled={true}
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
              </IonRow>

              <br />
              <IonRow>
                <IonSelect
                  label="Prioridad"
                  fill="outline"
                  labelPlacement="floating"
                  value={Prioridad}
                  disabled={true}
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
              </IonRow>

              <br />
              <IonRow>
                <IonSelect
                  label="Riesgo"
                  fill="outline"
                  labelPlacement="floating"
                  value={Riesgo}
                  disabled={true}
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
              </IonRow>

              <br />
              <IonRow>
                <IonSelect
                  label="Afectacion"
                  fill="outline"
                  labelPlacement="floating"
                  value={Afectacion}
                  disabled={true}
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
              </IonRow>

              <br />
              <IonRow>
                <IonSelect
                  label="Tecnico"
                  fill="outline"
                  labelPlacement="floating"
                  value={Tecnico}
                  disabled={true}
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
              <br />
              <IonRow>
                <IonInput
                  type="text"
                  label="Diagnostico"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder="Ingrese la diagnostico"
                  onIonFocus={() => {
                    if (!CT_Descripcion) {
                      // Asume que 'costos' es el estado que almacena el valor actual del input
                      setDescripcionError("Por favor, ingrese un diagnostico.");
                    }
                  }}
                  onIonInput={(e: any) => {
                    const value = e.detail.value;
                    if (!value) {
                      setDescripcionError(
                        "Por favor, ingrese un diagnostico válida."
                      );
                    } else {
                      setCT_Descripcion(value);
                      setDescripcionError("");
                    }
                  }}
                />
                <IonText color="danger">{DescripcionError}</IonText>
              </IonRow>
              <br />
              <IonRow>
                <IonInput
                  type="number"
                  label="Tiempo Solución Horas"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder="Ingrese el tiempo de solución"
                  onIonFocus={() => {
                    if (!CN_Tiempo_Solucion) {
                      // Asume que 'costos' es el estado que almacena el valor actual del input
                      setTSolucionError("Por favor, ingrese una duracion");
                    }
                  }}
                  onIonInput={(e: any) => {
                    const value = e.detail.value;
                    if (!value) {
                      setTSolucionError("Por favor, ingrese un tiempo válido.");
                    } else {
                      setCN_Tiempo_Solucion(value);
                      setTSolucionError("");
                    }
                  }}
                />
                <IonText color="danger">{TiempoSolucionError}</IonText>
              </IonRow>
              <br />
              <IonRow>
                <IonSelect
                  label="Requiere Compra"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder="Ingrese la compra"
                  onIonChange={(e: any) => {
                    const value = e.detail.value;
                    if (!value) {
                      setCompraError("Por favor, seleccione una respuesta.");
                    } else {
                      setCT_Compra(value);
                      setCompraError("");
                    }
                  }}
                >
                  <IonSelectOption value="Si">Si</IonSelectOption>
                  <IonSelectOption value="No">No</IonSelectOption>
                </IonSelect>
                <IonText color="danger">{CompraError}</IonText>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
      </>
    );
  }
}

export default FormUsuario;
