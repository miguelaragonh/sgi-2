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

function Modal() {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [message, setMessage] = useState(
    "This modal example uses triggers to automatically open a modal when the button is clicked."
  );

  function confirm() {
    modal.current?.dismiss(input.current?.value, "confirm");
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      setMessage(`Hello, ${ev.detail.data}!`);
    }
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
              >
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>Nuevo Usuario</IonTitle>
            <IonButtons slot="end">
              <IonButton
                strong={true}
                onClick={() => confirm()}
                color="success"
              >
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonInput
              label="Enter your name"
              labelPlacement="stacked"
              ref={input}
              type="text"
              placeholder="Your name"
            />
          </IonItem>
        </IonContent>
      </IonModal>
    </IonPage>
  );
}

export default Modal;
