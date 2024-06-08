import React from "react";
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/Page";
import Login from "./components/Login";
import Home from "./components/Home";
import Aboutme from "./components/About";
import Usuarios from "./components/Usuario";
import IncidenteNuevo from "./components/IncidenteNuevo";
import DiagnosticoIncidente from "./components/DiagnosticoIncidente";
import AsignarIncidente from "./components/AsignarIncidentes";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { AuthProvider, useAuth } from "./components/UserContext";
import { RouteUsuario } from "./Rutas";

setupIonicReact();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Route path="/login" exact={true}>
                <Page childComponent={<Login />} />
              </Route>
              <RouteUsuario
                path="/aboutme"
                exact
                component={() => <Page childComponent={<Aboutme />} />}
              />
              <RouteUsuario
                path="/usuarios"
                exact
                component={() => <Page childComponent={<Usuarios />} />}
              />
              <RouteUsuario
                path="/incidentes-usuario"
                exactincidentes-usuario
                component={() => <Page childComponent={<IncidenteNuevo />} />}
              />

              <RouteUsuario
                path="/asignar-incidente"
                exactincidentes-usuario
                component={() => <Page childComponent={<AsignarIncidente />} />}
              />

              <RouteUsuario
                path="/diagnosticar-incidente"
                exactincidentes-usuario
                component={() => <Page childComponent={<DiagnosticoIncidente />} />}
              />

              <RouteUsuario
                path="/home"
                exact
                component={() => <Page childComponent={<Home />} />}
              />
              <Route path="/" exact={true}>
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </AuthProvider>
  );
};

export default App;
