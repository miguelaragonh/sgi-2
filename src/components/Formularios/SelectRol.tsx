import React, { useState, useEffect, useRef } from 'react';
import { IonItem, IonList, IonSelect, IonSelectOption, IonButton } from '@ionic/react';

function Example() {
  const [showSelect, setShowSelect] = useState(false);
  const selectRef = useRef(null);
  useEffect(() => {
    if (showSelect && selectRef.current) {
      selectRef.current.open();
      setShowSelect(false); // Restablecer el estado para permitir futuras aperturas
    }
  }, [showSelect]);

  const handleOpenSelect = () => {
    setShowSelect(true);
  };

  // Función para manejar el cambio de selección
  const handleSelectionChange = (event) => {
    console.log(event.detail.value); // Aquí puedes acceder a los valores seleccionados
    // Aquí puedes agregar más lógica que quieras ejecutar después de seleccionar
  };

  return (
    <>
      <IonButton onClick={handleOpenSelect} fill="outline" size="small" color="sumary" >Roles</IonButton>
      <div style={{ display: 'none' }}>
        <IonList>
          <IonItem>
            <IonSelect
              ref={selectRef}
              aria-label="Fruit"
              label="Roles Asignados"
              placeholder="Select all fruits that apply"
              multiple={true}
              onIonCancel={() => setShowSelect(false)}
              onIonChange={handleSelectionChange} // Agregar el manejador del evento aquí
            >
              <IonSelectOption value="apples">Apples</IonSelectOption>
              <IonSelectOption value="oranges">Oranges</IonSelectOption>
              <IonSelectOption value="bananas">Bananas</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>
      </div>
    </>
  );
}

export default Example;