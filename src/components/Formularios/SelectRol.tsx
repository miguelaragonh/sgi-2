import React, { useState, useEffect, useRef } from "react";
import {
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonButton,
} from "@ionic/react";
import axios from "axios";
import { useAuth } from "../UserContext";

function Example({ id }: any) {
  const [showSelect, setShowSelect] = useState(false);
  const selectRef = useRef(null);
  const puerto = "http://localhost:3000";
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]); 
  const [RolesAsignados, setRolesAsinados] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (showSelect && selectRef.current) {
      selectRef.current.open();
      setShowSelect(false); 
    }
  }, [showSelect]);

  const handleOpenSelect = () => {
    axios
      .get(`${puerto}/roles`)
      .then(function (response) {
        setRoles(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setShowSelect(true);

    axios
    .get(`${puerto}/roles/${id}`)
    .then(function (response) {
      setSelectedRoles(response.data.map((rol: any) => rol.CN_Id_Rol));
      setRolesAsinados(true);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  const handleSelectionChange = (event: any) => {
    console.log(event.detail.value);
    RolesAsignados ? setSelectedRoles(event.detail.value) : setSelectedRoles([]); 
   axios
    .post(`${puerto}/roles/${id}`,{
      roles: event.detail.value
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
    axios
      .post(`${puerto}/bitacora1`, {
        CT_Codigo_Usuario: user.usuario.CT_Codigo_Usuario,
        CN_Id_Pantalla: 6,
        CT_Nombre_Referencia:
          `acción=Asigno Rol, Código de pantalla = 6, código rol = 2,código usuario=${user.usuario.CT_Codigo_Usuario}`,
      });



  };

  return (
    <>
      <IonButton
        onClick={handleOpenSelect}
        fill="outline"
        size="small"
        color="success"
      >
        Roles
      </IonButton>
      <div style={{ display: "none" }}>
        <IonList>
          <IonItem>
            <IonSelect
              ref={selectRef}
              aria-label="Fruit"
              label="Roles Asignados"
              placeholder="Select all fruits that apply"
              multiple={true}
              value={selectedRoles} 
              onIonCancel={() => setShowSelect(false)}
              onIonChange={handleSelectionChange}>
              {roles ? (
                roles.map((rol): any => {
                  return (
                    <IonSelectOption key={rol.CN_Id_Rol} value={rol.CN_Id_Rol}>
                      {rol.CT_Descripcion}
                    </IonSelectOption>
                  );
                })
              ) : (
                <IonSelectOption value="0">Desconocido</IonSelectOption>
              )}
            </IonSelect>
          </IonItem>
        </IonList>
      </div>
    </>
  );
}

export default Example;