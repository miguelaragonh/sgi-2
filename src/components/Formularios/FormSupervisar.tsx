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
  IonTextarea,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import axios from "axios";
import { Redirect, useHistory } from "react-router";
import { useAuth } from "../UserContext";
import { j } from "vite/dist/node/types.d-aGj9QkWt";

function FormUsuario({ id, datos, imagen, estado }: any) {
  const puerto = "https://sgi-b2-production.up.railway.app";
  const history = useHistory();
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [CodigoIncidente, setCodigoIncidente] = useState();
  const [Descripcion, setDescripcion] = useState();
  const [Lugar, setLugar] = useState();
  const [Titulo, setTitulo] = useState();
  const [Costos, setCostos] = useState();
  const [Duracion, setDuracion] = useState();
  const [Justificacion, setJustificacion] = useState();

  const [Categoria, setCategoria] = useState();
  const [Categorias, setCategorias] = useState();
  const [Diagnostico, setDiagnostico] = useState();
  const [TiempoSolucion, setTiempoSolucion] = useState();
  const [RequiereCompra, setRequieresCompra] = useState();

  const [Prioridad, setPrioridad] = useState();
  const [Prioridades, setPrioridades] = useState();

  const [Riesgo, setRiesgo] = useState();
  const [Riesgos, setRiesgos] = useState();

  const [Afectacion, setAfectacion] = useState();
  const [Afectaciones, setAfectaciones] = useState();

  const [Tecnico, setTecnico] = useState();
  const [NuevoEstado, setNuevoEstado] = useState();
  const [Tecnicos, setTecnicos] = useState();

  const [CategoriaError, setCategoriaError] = useState("");
  const [CostoError, setCostoError] = useState("");
  const [DuracionError, setDuracionError] = useState("");
  const [PrioridadError, setPrioridadError] = useState("");
  const [RiesgoError, setRiesgoError] = useState("");
  const [AfectacionError, setAfectacionError] = useState("");
  const [TecnicoError, setTecnicoError] = useState("");
  const [peticionError, setPeticionErro] = useState("");
  const [EstadoError, setEstadoError] = useState("");
  const [JustificacionError, setJustificacionError] = useState("");
  const { user } = useAuth();

  function supervisarIncidente() {
    axios
      .put(`${puerto}/incidencia/supervizar/${CodigoIncidente}`, {
        CN_Id_Estado: NuevoEstado,
        justificacionCierre: Justificacion,
      })
      .then(function (response) {
        console.log(response);
        window.location.href = "/home";
      })
      .catch(function (error) {
        console.log(error);
        setPeticionErro(
          "Error al agregar el usuario, " + error.response.data.msg
        );
      });
    axios.post(`${puerto}/bitacora1`, {
      CT_Codigo_Usuario: user.usuario.CT_Codigo_Usuario,
      CN_Id_Pantalla: 4,
      CT_Nombre_Referencia: `acción=Evaluar Incidente, Código de pantalla = 5, código rol = 2,código usuario=${user.usuario.CT_Codigo_Usuario}`,
    });
    axios.post(`${puerto}/bitacora2`, {
      CT_Codigo_Usuario: user.usuario.CT_Codigo_Usuario,
      CN_Id_Estado: estado == "En reparación" ? 4 : 5,
      CN_Id_Nuevo_Estado: NuevoEstado,
      CT_Id_Incidencia: CodigoIncidente,
    });
  }

  function resetearEstados() {
    setNuevoEstado("");
    setJustificacion("");
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
    setCostos(datos.CN_Costos);
    setDuracion(datos.CN_Duracion);
  }

  useEffect(() => {
    console.log(estado);
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
    axios
      .get(`${puerto}/tecnicos/${datos.CT_Id_Incidencia}`)
      .then((response) => {
        setTecnico(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de estados:", error);
      });
    axios
      .get(`${puerto}/incidencia/diagnostico/${datos.CT_Id_Incidencia}`)
      .then((response) => {
        setDiagnostico(response.data[0].CT_Descripcion);
        setTiempoSolucion(response.data[0].CN_Tiempo_Solucion);
        setRequiereCompra(response.data[0].CT_Compra);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de estados:", error);
      });
  }, []);

  function confirm() {
    supervisarIncidente();
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
        <IonButton id={id} fill="outline" size="small" color="danger">
          Evaluar
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
                Supervisar Incidente
              </IonTitle>
              <IonButtons slot="end">
                <IonButton
                  strong={true}
                  onClick={() => confirm()}
                  color="primary"
                  fill="clear"
                  disabled={
                    !NuevoEstado || (NuevoEstado == 9 && !Justificacion)
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
                  value={Costos}
                  readonly={true}
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
                  value={Duracion}
                  readonly={true}
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
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
                  multiple={true}
                  value={Tecnico}
                  disabled
                  onClick={() => {
                    axios
                      .get(`${puerto}/tecnicos`)
                      .then((response) => {
                        setTecnicos(response.data);
                      })
                      .catch((error) => {
                        console.error(
                          "Error al obtener la lista de estados:",
                          error
                        );
                      });
                  }}
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
                          {Tecnico.CT_Codigo_Usuario}- {Tecnico.Usuario}
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
                <IonSelect
                  label="Requiere Compra"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder="Ingrese la compra"
                  value={RequiereCompra}
                  disabled
                >
                  <IonSelectOption value="Si">Si</IonSelectOption>
                  <IonSelectOption value="No">No</IonSelectOption>
                </IonSelect>
              </IonRow>
              <br />
              <IonRow>
                <IonTextarea
                  label="Diagnostico"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder="Ingrese la diagnostico"
                  readonly={true}
                  value={Diagnostico}
                />
              </IonRow>
              <br />
              <IonRow>
                <IonInput
                  type="number"
                  label="Tiempo Solución Horas"
                  labelPlacement="floating"
                  fill="outline"
                  placeholder="Ingrese el tiempo de solución"
                  readonly={true}
                  value={TiempoSolucion}
                />
              </IonRow>

              <br />
              <IonRow>
                <IonSelect
                  label="Evaluacion"
                  fill="outline"
                  labelPlacement="floating"
                  placeholder="Seleccione un Estado"
                  value={NuevoEstado}
                  onIonChange={(e: any) => {
                    const value = e.target.value;
                    if (value) {
                      setNuevoEstado(value);
                      setEstadoError("");
                    } else {
                      setEstadoError("Por favor, seleccione un estado");
                    }
                  }}
                >
                  <IonSelectOption value={7}>7- Aprobado</IonSelectOption>
                  <IonSelectOption value={8}>8- Rechazado</IonSelectOption>
                  <IonSelectOption value={9}>9- Cerrado</IonSelectOption>
                </IonSelect>
                <IonText color="danger">{EstadoError}</IonText>
              </IonRow>
              <br />
              <IonRow>
                {NuevoEstado == 9 && (
                  <>
                    <IonInput
                      type="text"
                      label="Justicacion de Cierre"
                      labelPlacement="floating"
                      fill="outline"
                      placeholder="Ingrese la justificacion del cierre"
                      value={Justificacion}
                      onIonFocus={() => {
                        if (!Justificacion) {
                          setJustificacionError(
                            "Por favor, Ingrese la justificacion del cierre "
                          );
                        }
                      }}
                      onIonInput={(e: any) => {
                        const value = e.detail.value; // Cambiado de e.target.value a e.detail.value
                        if (!value) {
                          setJustificacionError(
                            "Por favor, Ingrese la justificacion del cierre"
                          );
                        } else {
                          setJustificacion(value);
                          setJustificacionError("");
                        }
                      }}
                    />
                    <IonText color="danger">{JustificacionError}</IonText>
                  </>
                )}
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
      </>
    );
  }
}

export default FormUsuario;
