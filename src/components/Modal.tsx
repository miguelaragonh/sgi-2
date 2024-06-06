import React, { useState, useRef } from "react";
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
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";

function Modal({ childComponent}:any) {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);


  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }


  return (
    <IonPage>
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
            <IonTitle style={{ justifyContent: "center", textAlign: "center", color:'black'}}>Nuevo Usuario</IonTitle>
            <IonButtons slot="end">
              <IonButton
                strong={true}
                onClick={() => confirm()}
                color="primary"
                fill="clear"
              >
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            {childComponent}
           
          </IonItem>
        </IonContent>
      </IonModal>
    </IonPage>
  );
}

export default Modal;
