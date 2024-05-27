import React, { useEffect, useState } from "react";
import sgi from "../img/sgi.png";
import axios from "../api/axios";
import {
  IonButtons,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Link, Redirect, useHistory } from "react-router-dom";
//const axios = require('axios/dist/node/axios.cjs');
import { IonContent } from "@ionic/react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import "../style/login.css";
import { useAuth } from "./UserContext";
import Cookies from "js-cookie";
function Login() {
  const [usuario, setUsuario] = useState("");
  const [data, setData] = useState(null);
  const [contrasena, setContrasena] = useState("");
  const [validacionCorreo, setValidacionCorreo] = useState(false);
  const [validacionContrasena, setValidacionContrasena] = useState(false);
  const { datos, isAuthenticated, user } = useAuth();
  const navigate = useHistory();

  useEffect(() => {
    if (isAuthenticated) navigate.push("/home");
  }, [isAuthenticated]);

  const handdleLogin = (e: any) => {
    e.preventDefault();

    validarCorreo(usuario)
      ? setValidacionCorreo(false)
      : setValidacionCorreo(true);
    validarContrasena(contrasena)
      ? setValidacionContrasena(true)
      : setValidacionContrasena(false);

    if (
      validarCorreo(usuario) == true &&
      validarContrasena(contrasena) == false
    ) {
      axios
        .post(
          "/usuarios/iniciar",
          {
            CT_Usuario: usuario,
            CT_Contraseña: contrasena,
          }
        )
        .then((response) => {
          setData(response.data);
          datos(response.data);
          localStorage.setItem('token', response.data.token);
        });
    } else {
      console.log("No datos");
    }
  };

  const validarCorreo = (correo: any) => {
    var patron = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return patron.test(correo);
  };

  const validarContrasena = (contrasena: any) => {
    return contrasena == "" ? true : false;
  };

  return (
    <div className="content">
      <IonCard className="custom-card">
        <img alt="Silhouette of mountains" src={sgi} />
        <IonCardHeader>
          <IonCardTitle className="custom-card-title">
            Iniciar Sesion
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent className="custom-card-content">
          <form className="form">
            <div className="flex-column">
              <label>Correo </label>
            </div>
            <div className="inputForm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-at"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
              </svg>
              <input
                onChange={(e) => {
                  setUsuario(e.target.value);
                }}
                type="text"
                className="input"
                placeholder="Ingrese Correo ELectronico"
              />
              <p
                style={{
                  visibility: validacionCorreo ? "visible" : "hidden",
                  color: "red",
                }}
              >
                Inválido
              </p>
            </div>

            <div className="flex-column">
              <label>Contraseña </label>
            </div>
            <div className="inputForm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-lock"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
              </svg>
              <input
                onChange={(e) => {
                  setContrasena(e.target.value);
                }}
                type="password"
                className="input"
                placeholder="Ingrese la Contraseña"
              />
              <p
                style={{
                  visibility: validacionContrasena ? "visible" : "hidden",
                  color: "red",
                }}
              >
                Vacio
              </p>
            </div>

            <button className="button-submit" onClick={handdleLogin}>
              Iniciar
            </button>
          </form>
        </IonCardContent>
      </IonCard>
    </div>
  );
}
export default Login;
